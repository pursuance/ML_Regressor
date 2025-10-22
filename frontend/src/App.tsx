"use client"

import { useEffect, useState } from "react"
import { useDataStore, useSelectionsStore, useFinalParametersStore } from "@/store"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CSVReader from "@/components/CSVReader"
import SelectSampleData from "@/components/SelectSampleData"
import CSV_Viewer from "@/components/CSV_Viewer"
import SubmissionForm from "@/components/SubmissionForm"
import ChartComponent from "./components/ChartComponent"
import FinalParams from "./components/FinalParams"

export default function MLRegressionApp() {
  const [currentView, setCurrentView] = useState<"upload" | "data" | "train">("upload")
  const { data, setData } = useDataStore()
  const { features, label } = useSelectionsStore()
  const { J_history, } = useFinalParametersStore()

  const canProceedToData = data && data.length > 0
  const canProceedToTrain = canProceedToData && features.length > 0 && label

  useEffect(() => {
    if (!data) {
      const newData = localStorage.getItem('data')
      newData && setData(JSON.parse(newData))
    }
  }, [])

  useEffect(() => {
    if (data) {
      setCurrentView('data')
    }
  }, [data])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-4">Linear Regression Model Trainer</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Upload your CSV data, select features and labels, then train a linear regression model with gradient
            descent.
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex gap-2">
            <Button className="cursor-pointer" variant={currentView === "upload" ? "default" : "outline"} onClick={() => setCurrentView("upload")}>
              1. Select Data
            </Button>
            <Button
              variant={currentView === "data" ? "default" : "outline"}
              onClick={() => setCurrentView("data")}
              disabled={!canProceedToData}
              className="cursor-pointer"
            >
              2. Select Features and Target
            </Button>
            <Button
              variant={currentView === "train" ? "default" : "outline"}
              onClick={() => setCurrentView("train")}
              disabled={!canProceedToTrain}
              className="cursor-pointer"
            >
              3. Train Model
            </Button>
          </div>
        </div>

        {/* Content */}
        {currentView === "upload" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>Drag and drop your CSV file or select from sample datasets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upload Your File</h3>
                    <div className="h-64">
                      <CSVReader />
                    </div>
                  </div>
                 <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold mb-6">Or Try Sample Data</h3>
                    <div className="mt-4">
                      <SelectSampleData />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {canProceedToData && (
              <div className="text-center">
                <Button className="cursor-pointer" onClick={() => setCurrentView("data")} size="lg">
                  Proceed to Feature Selection →
                </Button>
              </div>
            )}
          </div>
        )}

        {currentView === "data" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Features and Label</CardTitle>
                <CardDescription>
                  Click 'x' to select features (input variables) and 'y' to select the label (target variable)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CSV_Viewer />
              </CardContent>
            </Card>

            {canProceedToTrain && (
              <div className="text-center">
                <Button className="cursor-pointer" onClick={() => setCurrentView("train")} size="lg">
                  Proceed to Model Training →
                </Button>
              </div>
            )}
          </div>
        )}

        {currentView === "train" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Model Parameters</CardTitle>
                <CardDescription>Configure the gradient descent parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionForm />
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Training Results</CardTitle>
                  <CardDescription>Cost function optimization over iterations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <ChartComponent />
                    </div>
                    {J_history.length > 0 &&
                      <FinalParams />
                    }
                  </div>                    
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
