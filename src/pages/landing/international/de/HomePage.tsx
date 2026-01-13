import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart, Globe, Cpu, ShieldCheck } from 'lucide-react';

// Header Component (Placeholder)
const LandingHeaderDE = () => (
  <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
      <a href="/de" className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
        <span className="font-bold text-lg">Magic</span>
      </a>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#features" className="text-muted-foreground transition-colors hover:text-foreground">Funktionen</a>
        <a href="#vision" className="text-muted-foreground transition-colors hover:text-foreground">Unsere Vision</a>
        <a href="#produkte" className="text-muted-foreground transition-colors hover:text-foreground">Produkte</a>
        <a href="/book" className="text-muted-foreground transition-colors hover:text-foreground">Das Buch</a>
      </nav>
      <Button>Anmelden</Button>
    </div>
  </header>
);

// Hero Section
const HeroSectionDE = () => (
  <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-b from-background to-background/80">
    <div className="container px-4 md:px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Die Zukunft des Finanzwesens. Heute.
      </h1>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6">
        Vereinigen Sie Zahlungen, Treasury und KI-gesteuerte Einblicke in einer einzigen, souveränen Plattform. Entwickelt für die Pioniere von morgen.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg">
          Jetzt starten <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline">
          Demo anfordern
        </Button>
      </div>
    </div>
  </section>
);

// Features Section
const FeaturesSectionDE = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Globales Treasury-Management",
      description: "Verwalten Sie mühelos virtuelle Konten, grenzüberschreitende Zahlungen und Währungsumrechnungen in Echtzeit über eine einzige Schnittstelle."
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "KI-gestützte Analytik",
      description: "Nutzen Sie prädiktive Modelle für Cashflow-Prognosen, Betrugserkennung und strategische Entscheidungsfindung, um immer einen Schritt voraus zu sein."
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Nahtlose API-Integration",
      description: "Verbinden Sie sich mit unserem robusten API-Ökosystem, um Arbeitsabläufe zu automatisieren und benutzerdefinierte Finanzlösungen zu erstellen, die mit Ihrem Unternehmen skalieren."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Umfassende Compliance",
      description: "Bleiben Sie mit integrierten Tools für KYC, AML und regulatorisches Reporting weltweit konform und minimieren Sie Risiken mühelos."
    }
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Kernfunktionen</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Eine Plattform für alle Ihre Finanzoperationen</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Von der Zahlungsabwicklung bis zur strategischen Finanzplanung bietet unsere Plattform die Werkzeuge, die Sie für Ihren Erfolg benötigen.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Vision Section
const VisionSectionDE = () => (
    <section id="vision" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Die Vision: Ein souveränes Finanzbetriebssystem</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Wir bauen mehr als nur eine App; wir schaffen ein dezentralisiertes, serverloses Ökosystem. Unsere Architektur ermöglicht es Ihnen, die volle Kontrolle über Ihre Daten und Operationen zu behalten, ohne von zentralen Servern abhängig zu sein. Webhooks und Peer-to-Peer-Logik treiben eine neue Ära der finanziellen Autonomie an.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <a href="/charter" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                        Lesen Sie die Charta
                    </a>
                    <a href="/book" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                        Entdecken Sie das Buch
                    </a>
                </div>
            </div>
            <div className="flex justify-center">
                {/* Placeholder for a diagram or complex visual */}
                <div className="w-full max-w-md h-80 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">[Visualisierung der dezentralen Architektur]</p>
                </div>
            </div>
        </div>
    </section>
);


// Product Showcase Section
const ProductShowcaseDE = () => (
    <section id="produkte" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Entdecken Sie unser Ökosystem</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Spezialisierte Module, die für komplexe finanzielle Herausforderungen entwickelt wurden.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>QuantumWeaver™</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Ein KI-gestütztes Tool zur Modellierung komplexer Finanzstrategien und zur Simulation von Marktauswirkungen.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Corporate Command</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Die ultimative Kommandozentrale für Unternehmensfinanzen, die Treasury, Zahlungen und Compliance integriert.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>SovereignWealth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Eine Plattform für die Verwaltung und das Wachstum von Vermögen mit Fokus auf alternative Anlagen und digitale Assets.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
);

// CTA Section
const CtaSectionDE = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 border-t">
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Bereit, Ihre Finanzoperationen zu transformieren?
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Treten Sie der Revolution bei und erleben Sie die Leistungsfähigkeit einer wirklich integrierten und intelligenten Finanzplattform.
        </p>
      </div>
      <div className="mx-auto w-full max-w-sm space-y-2">
        <Button type="submit" size="lg" className="w-full">
          Kontaktieren Sie den Vertrieb
        </Button>
        <p className="text-xs text-muted-foreground">
          Beginnen Sie noch heute Ihre Reise.{" "}
          <a href="#" className="underline underline-offset-2">
            Allgemeine Geschäftsbedingungen
          </a>
        </p>
      </div>
    </div>
  </section>
);

// Footer Component (Placeholder)
const LandingFooterDE = () => (
  <footer className="bg-muted p-6 md:py-12 w-full">
    <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
      <div className="grid gap-1">
        <h3 className="font-semibold">Unternehmen</h3>
        <a href="#">Über uns</a>
        <a href="#">Karriere</a>
        <a href="#">Presse</a>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Produkte</h3>
        <a href="#">Treasury</a>
        <a href="#">Zahlungen</a>
        <a href="#">KI-Einblicke</a>
        <a href="#">API</a>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Ressourcen</h3>
        <a href="#">Dokumentation</a>
        <a href="#">Blog</a>
        <a href="#">Support</a>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Rechtliches</h3>
        <a href="#">Datenschutzrichtlinie</a>
        <a href="#">Nutzungsbedingungen</a>
        <a href="#">Cookie-Einstellungen</a>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Kontakt</h3>
        <a href="#">Vertrieb</a>
        <a href="#">Partnerschaften</a>
      </div>
    </div>
    <div className="container mx-auto mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Magic Inc. Alle Rechte vorbehalten.
    </div>
  </footer>
);


const HomePageDE: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeaderDE />
      <main className="flex-1">
        <HeroSectionDE />
        <FeaturesSectionDE />
        <VisionSectionDE />
        <ProductShowcaseDE />
        <CtaSectionDE />
      </main>
      <LandingFooterDE />
    </div>
  );
};

export default HomePageDE;