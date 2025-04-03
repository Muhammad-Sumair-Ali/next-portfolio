import { connectDb } from "@/db";
import { verifyToken } from "@/helpers/auth";
import visitorsModel from "@/models/visitors.model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const TRACKING_CONFIG = {
  REVISIT_DAYS: 7,
  FALLBACK_IP: "202.163.122.1",
  IP_LOOKUP_TIMEOUT: 5000
};

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
      ip = TRACKING_CONFIG.FALLBACK_IP;
    }
    
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const currentDate = new Date();
    
    const existingVisitor = await visitorsModel.findOne({
      ip,
      userAgent,
      timestamp: { $gte: new Date(currentDate.getTime() - (TRACKING_CONFIG.REVISIT_DAYS * 24 * 60 * 60 * 1000)) }
    });
    
    if (existingVisitor) {
      return NextResponse.json(
        { 
          success: true, 
          message: `Visitor already recorded within the last ${TRACKING_CONFIG.REVISIT_DAYS} days`, 
          data: existingVisitor,
          duplicate: true
        },
        { status: 200 }
      );
    }
    
    let locationData = null;
    let source = "";
    try {
      const response = await axios.get(`https://api.ipdata.co/${ip}?api-key=${ipDataKey}`, {
        timeout: TRACKING_CONFIG.IP_LOOKUP_TIMEOUT
      });
      
      if (response.data && !response.data.error) {
        locationData = {
          city: response.data.city || "Unknown",
          country: response.data.country_name || "Unknown",
          region: response.data.region || "Unknown",
          timezone: response.data.time_zone?.name || "Unknown",
          isp: response.data.asn?.name || "Unknown",
        };
        source = "ipdata.co";
      }
    } catch (error) {
      console.log("ipdata.co lookup failed, trying next service");
    }
    
    if (!locationData) {
      try {
        const response = await axios.get(`https://api.db-ip.com/v2/free/${ip}`, {
          timeout: TRACKING_CONFIG.IP_LOOKUP_TIMEOUT
        });
        
        if (response.data && response.data.ipAddress) {
          locationData = {
            city: response.data.city || "Unknown",
            country: response.data.countryName || "Unknown",
            region: response.data.stateProv || "Unknown",
            timezone: "Unknown", 
            isp: "Unknown", 
          };
          source = "db-ip.com";
        }
      } catch (error) {
        console.log("db-ip.com lookup failed, trying next service");
      }
    }
    
    if (!locationData) {
      try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`, {
          timeout: TRACKING_CONFIG.IP_LOOKUP_TIMEOUT
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
    
    if (!locationData) {
      try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
          timeout: TRACKING_CONFIG.IP_LOOKUP_TIMEOUT
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
    
    // Create visit record
    const visitData = {
      ip,
      userAgent,
      ...locationData,
      source,
      timestamp: currentDate,
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

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }
    
    const url = new URL(req.url);
    const days = url.searchParams.get("days") ? parseInt(url.searchParams.get("days")!) : null;
    const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")!) : 100;
    
    const query: any = {};
    if (days) {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);
      query.timestamp = { $gte: dateThreshold };
    }
    
    const visitors = await visitorsModel.find(query)
      .sort({ timestamp: -1 })
      .limit(limit);
    
    const totalCount = await visitorsModel.countDocuments(query);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Visitors retrieved", 
        data: visitors,
        count: totalCount
      },
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