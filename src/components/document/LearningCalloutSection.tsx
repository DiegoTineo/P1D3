import { ArrowRight } from "lucide-react"
import { DocumentSection } from "@/components/document/DocumentSection"

interface LearningCalloutSectionProps {
  onOpenLearningOutcomes: () => void
}

export function LearningCalloutSection({
  onOpenLearningOutcomes,
}: LearningCalloutSectionProps) {
  return (
    <DocumentSection
      id="que-aprendo"
      title="¿Qué aprendo con este proyecto?"
    >
      <div className="space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
        <p>
          Al completar las 6 fases pondrás en práctica{" "}
          <strong className="font-semibold text-foreground">
            POO, programación orientada a eventos, TDAs genéricos desde cero,
            Base64, audio nativo, rendimiento con StringBuilder, C# .NET
            Windows Forms y Git / GitHub en equipo
          </strong>
          , entre otras competencias clave de ingeniería de software.
        </p>

        <div>
          <a
            href="#/que-aprendo"
            onClick={(e) => {
              e.preventDefault()
              onOpenLearningOutcomes()
            }}
            className="group inline-flex items-center gap-2 border-l-[3px] border-vice-pink bg-card/70 px-5 py-3 font-mono text-sm font-semibold text-vice-pink transition-colors hover:border-vice-orange hover:bg-card hover:text-vice-orange sm:text-base"
          >
            Ver la lista completa de todo lo que aprendes
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </DocumentSection>
  )
}
