"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface ReportGeneratorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportGeneratorModal({ open, onOpenChange }: ReportGeneratorModalProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState("last-30-days")
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const reportTypes = [
    { id: "ebitda", name: "EBITDA Performance Report", description: "Detailed financial performance analysis" },
    { id: "risk", name: "Risk Assessment Report", description: "Comprehensive risk analysis across all categories" },
    {
      id: "inventory",
      name: "Inventory Analysis Report",
      description: "Stock levels, turnover, and optimization insights",
    },
    { id: "consumer", name: "Consumer Analytics Report", description: "Customer behavior and market insights" },
    { id: "supply", name: "Supply Chain Report", description: "Supplier performance and logistics analysis" },
    { id: "ecommerce", name: "Digital Commerce Report", description: "Online sales and channel performance" },
  ]

  const handleReportToggle = (reportId: string) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  const generateReport = async () => {
    setIsGenerating(true)
    setProgress(0)

    // Simulate report generation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    // Simulate download
    setTimeout(() => {
      setIsGenerating(false)
      setProgress(0)
      onOpenChange(false)

      // Create a mock download
      const element = document.createElement("a")
      element.href = "data:text/plain;charset=utf-8,Mock Report Generated Successfully"
      element.download = `business-report-${Date.now()}.${format}`
      element.click()
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Business Report
          </DialogTitle>
          <DialogDescription>Create comprehensive reports with real-time data and analytics</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    id={report.id}
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={() => handleReportToggle(report.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={report.id} className="font-medium cursor-pointer">
                      {report.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Generating Report...</span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Processing {selectedReports.length} report(s) for {timeRange}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isGenerating} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={generateReport}
              disabled={selectedReports.length === 0 || isGenerating}
              className="bg-gradient-to-r from-blue-600 to-blue-700 w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
