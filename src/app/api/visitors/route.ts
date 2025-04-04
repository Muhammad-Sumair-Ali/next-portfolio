import { connectDb } from "@/db";
import { verifyToken } from "@/helpers/auth";
import visitorsModel from "@/models/visitors.model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const ipDataKey = process.env.TRACK_IPDATA_KEY;

    let ip = req.headers.get("x-forwarded-for") || 
             req.headers.get("x-real-ip") ||
             req.headers.get("cf-connecting-ip") || 
             req.headers.get("x-client-ip") || 
             req.headers.get("true-client-ip") ||
             "Unknown";
             
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    
    if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip === "Unknown") {
      ip = "202.163.122.1"; 
    }
    
    
    const userAgent = req.headers.get("user-agent") || "Unknown";
    
    const existingVisitor = await visitorsModel.findOne({
      ip,
      userAgent,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    if (existingVisitor) {
      return NextResponse.json(
        { success: true, message: "Visitor already recorded today", data: existingVisitor },
        { status: 200 }
      );
    }
    
    
    let locationData = null;
    let source = "";
    
    try {
      const response = await axios.get(`https://api.ipdata.co/${ip}?api-key=${ipDataKey}`, {
        timeout: 5000
      });
      
      if (response.data && !response.data.error) {
        locationData = {
          city: response.data.city || "Unknown",
          country: response.data.country_name || "Unknown",
          region: response.data.region || "Unknown",
          timezone: response.data.time_zone.name || "Unknown",
          isp: response.data.asn?.name || "Unknown",
        };
        source = "ipdata.co";
      }
    } catch (error) {
      console.log("ipdata.co lookup failed, trying next service");
    }
    
    // Service 2: DB-IP (good Asia coverage)
    if (!locationData) {
      try {
        // Using their free tier API
        const response = await axios.get(`https://api.db-ip.com/v2/free/${ip}`, {
          timeout: 5000
        });
        
        if (response.data && response.data.ipAddress) {
          locationData = {
            city: response.data.city || "Unknown",
            country: response.data.countryName || "Unknown",
            region: response.data.stateProv || "Unknown",
            timezone: "Unknown", // Not provided by free tier
            isp: "Unknown", // Not provided by free tier
          };
          source = "db-ip.com";
        }
      } catch (error) {
        console.log("db-ip.com lookup failed, trying next service");
      }
    }
    
    // Service 3: IP-API (third option)
    if (!locationData) {
      try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`, {
          timeout: 5000
        });
        
        if (response.data && response.data.status !== "fail") {
          locationData = {
            city: response.data.city || "Unknown",
            country: response.data.country || "Unknown",
            region: response.data.regionName || "Unknown",
            timezone: response.data.timezone || "Unknown",
            isp: response.data.isp || "Unknown",
          };
          source = "ip-api.com";
        }
      } catch (error) {
        console.log("ip-api.com lookup failed");
      }
    }
    
    // Service 4: IPAPI.co (last resort)
    if (!locationData) {
      try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
          timeout: 5000
        });
        
        if (response.data && !response.data.error) {
          locationData = {
            city: response.data.city || "Unknown",
            country: response.data.country_name || "Unknown",
            region: response.data.region || "Unknown",
            timezone: response.data.timezone || "Unknown",
            isp: response.data.org || "Unknown",
          };
          source = "ipapi.co";
        }
      } catch (error) {
        console.log("ipapi.co lookup failed");
      }
    }
    
    // Default values if all services failed
    if (!locationData) {
      locationData = {
        city: "Unknown",
        country: "Unknown",
        region: "Unknown",
        timezone: "Unknown",
        isp: "Unknown",
      };
      source = "none";
    }
    
    const visitData = {
      ip,
      userAgent,
      ...locationData,
      source, // Store which service provided the data
      timestamp: new Date(),
    };
    
    const newVisitor = await visitorsModel.create(visitData);
    
    return NextResponse.json(
      { success: true, message: "New visit recorded", data: newVisitor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tracking visit:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { success: false, message: "Error tracking visit", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req:NextRequest) {
  try {
    await connectDb();
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        // Verify user from token
        const token = authHeader.split(" ")[1];
        const user = verifyToken(token);
    
        if (!user || user.role !== "admin") {
          return NextResponse.json({ error: "Access Denied" }, { status: 403 });
        }
    
    const visitors = await visitorsModel.find().sort({ timestamp: -1 });
    
    return NextResponse.json(
      { success: true, message: "Visitors retrieved", data: visitors },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving visitors:", error);
    return NextResponse.json(
      { success: false, message: "Error retrieving visitors" },
      { status: 500 }
    );
  }
}