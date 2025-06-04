import { NextRequest, NextResponse } from "next/server"
import { runAllCleanupTasks } from "@/lib/cleanup-utils"

export async function POST(request: NextRequest) {
  try {
    // Optional: Add API key authentication for security
    const apiKey = request.headers.get('x-api-key')
    const expectedApiKey = process.env.CLEANUP_API_KEY

    if (expectedApiKey && apiKey !== expectedApiKey) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    // Run cleanup tasks
    const results = await runAllCleanupTasks()

    return NextResponse.json({
      message: "Cleanup completed successfully",
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Cleanup API error:", error)
    return NextResponse.json(
      { 
        message: "Cleanup failed", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
}

// GET method to check cleanup status
export async function GET() {
  try {
    return NextResponse.json({
      message: "Cleanup API is available",
      endpoints: {
        runCleanup: "POST /api/admin/cleanup",
        checkStatus: "GET /api/admin/cleanup"
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Cleanup status error:", error)
    return NextResponse.json(
      { message: "Error checking cleanup status" },
      { status: 500 }
    )
  }
}
