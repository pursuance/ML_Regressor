import { Brain, Github, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ML Regressor</span>
          </div>

          {/* <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              API
            </a>
          </nav> */}

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href="https://github.com/pursuance/learning_linear_regression" target="_blank">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            {/* <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  )
}
