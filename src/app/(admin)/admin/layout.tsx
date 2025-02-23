"use client"

export default function AdminLayout({ children }:any) {
  return (
    <html lang="en">
      <body className="flex">
      
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
