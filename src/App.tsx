import { useEffect, useState } from "react"
import { AppBar, type AppRoute } from "@/components/document/AppBar"
import { DedicationFooter } from "@/components/document/DedicationFooter"
import { DeliverySection } from "@/components/document/DeliverySection"
import { HeroHeader } from "@/components/document/HeroHeader"
import { LearningCalloutSection } from "@/components/document/LearningCalloutSection"
import { PipelineSection } from "@/components/document/PipelineSection"
import { SharedResourcesSection } from "@/components/document/SharedResourcesSection"
import { SpotifyAudioBar } from "@/components/document/SpotifyAudioBar"
import { StoryContextSection } from "@/components/document/StoryContextSection"
import { TechnicalRequirementsSection } from "@/components/document/TechnicalRequirementsSection"
import { TransmissionsModal } from "@/components/document/TransmissionsModal"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { AudioBase64Page } from "@/pages/AudioBase64Page"
import { GenericTypesPage } from "@/pages/GenericTypesPage"
import { ImagesBase64Page } from "@/pages/ImagesBase64Page"
import { LearningOutcomesPage } from "@/pages/LearningOutcomesPage"
import { StringBuilderPage } from "@/pages/StringBuilderPage"

function readRouteFromHash(): AppRoute {
  switch (window.location.hash) {
    case "#/generic-types":
      return "generic-types"
    case "#/string-builder":
      return "string-builder"
    case "#/imagenes-base64":
      return "imagenes-base64"
    case "#/audio-base64":
      return "audio-base64"
    case "#/que-aprendo":
      return "que-aprendo"
    default:
      return "home"
  }
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(readRouteFromHash)
  const [transmissionsOpen, setTransmissionsOpen] = useState(false)
  const { scrollToTop } = useSmoothScroll(transmissionsOpen)

  useEffect(() => {
    const onHashChange = () => setRoute(readRouteFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const navigate = (target: AppRoute) => {
    const hashMap: Record<AppRoute, string> = {
      home: "",
      "generic-types": "#/generic-types",
      "string-builder": "#/string-builder",
      "imagenes-base64": "#/imagenes-base64",
      "audio-base64": "#/audio-base64",
      "que-aprendo": "#/que-aprendo",
    }
    window.location.hash = hashMap[target]
    setRoute(target)
    scrollToTop()
  }

  return (
    <div className="min-h-svh bg-background pb-24 text-foreground selection:bg-vice-magenta/40 selection:text-white">
      <AppBar currentRoute={route} onNavigate={navigate} />

      {route === "generic-types" ? (
        <GenericTypesPage onBack={() => navigate("home")} />
      ) : route === "string-builder" ? (
        <StringBuilderPage onBack={() => navigate("home")} />
      ) : route === "imagenes-base64" ? (
        <ImagesBase64Page onBack={() => navigate("home")} />
      ) : route === "audio-base64" ? (
        <AudioBase64Page onBack={() => navigate("home")} />
      ) : route === "que-aprendo" ? (
        <LearningOutcomesPage
          onBack={() => navigate("home")}
          onNavigate={navigate}
        />
      ) : (
        <>
          <HeroHeader />

          <main className="mx-auto flex max-w-7xl flex-col gap-20 px-6 pt-12 pb-16 sm:gap-24 sm:px-10 sm:pt-16">
            <StoryContextSection
              onOpenTransmissions={() => setTransmissionsOpen(true)}
            />
            <SharedResourcesSection />
            <TechnicalRequirementsSection
              onOpenGenericTypes={() => navigate("generic-types")}
            />
            <PipelineSection
              onOpenStringBuilder={() => navigate("string-builder")}
              onOpenImagesGuide={() => navigate("imagenes-base64")}
              onOpenAudioGuide={() => navigate("audio-base64")}
              onOpenTransmissions={() => setTransmissionsOpen(true)}
            />
            <DeliverySection />
            <LearningCalloutSection
              onOpenLearningOutcomes={() => navigate("que-aprendo")}
            />
            <DedicationFooter />
          </main>
        </>
      )}

      <TransmissionsModal
        open={transmissionsOpen}
        onClose={() => setTransmissionsOpen(false)}
      />

      <SpotifyAudioBar />
    </div>
  )
}

export default App
