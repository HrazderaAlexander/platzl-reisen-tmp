import React from 'react';
import { ArrowLeft, FileText, Calendar, CreditCard, Shield, AlertTriangle } from 'lucide-react';

interface AGBPageProps {
  onBack: () => void;
}

export const AGBPage: React.FC<AGBPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-accent/80 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium text-sm">Zurück</span>
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-3 rounded-2xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Allgemeine Geschäftsbedingungen</h1>
              <p className="text-white/90 text-lg mt-2">Platzl Reisen - Reisebedingungen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Wichtiger Hinweis */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Wichtiger Hinweis</h3>
                <p className="text-yellow-700 text-sm">
                  Diese AGB gelten für alle Reisen von Platzl Reisen. Bitte lesen Sie diese sorgfältig durch, 
                  bevor Sie eine Buchung vornehmen.
                </p>
              </div>
            </div>
          </div>

          {/* AGB Sections */}
          <div className="space-y-8">
            {/* Buchung und Anmeldung */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">1. Buchung und Anmeldung</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="mb-4">
                  <strong>1.1 Vertragsabschluss:</strong> Der Reisevertrag kommt durch Ihre Anmeldung und unsere 
                  Bestätigung zustande. Die Anmeldung kann schriftlich, telefonisch oder online erfolgen.
                </p>
                <p className="mb-4">
                  <strong>1.2 Anzahlung:</strong> Mit der Buchung ist eine Anzahlung von 20% des Reisepreises 
                  fällig. Der Restbetrag ist 4 Wochen vor Reiseantritt zu bezahlen.
                </p>
                <p>
                  <strong>1.3 Mindestteilnehmerzahl:</strong> Unsere Reisen finden ab einer Mindestteilnehmerzahl 
                  von 25 Personen statt. Bei Nichterreichen behalten wir uns vor, die Reise bis 4 Wochen vor 
                  Reiseantritt abzusagen.
                </p>
              </div>
            </section>

            {/* Preise und Zahlung */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">2. Preise und Zahlung</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="mb-4">
                  <strong>2.1 Reisepreis:</strong> Alle angegebenen Preise verstehen sich pro Person im 
                  Doppelzimmer. Einzelzimmerzuschläge sind gesondert ausgewiesen.
                </p>
                <p className="mb-4">
                  <strong>2.2 Zahlungsmodalitäten:</strong> Die Zahlung erfolgt per Überweisung oder Barzahlung 
                  in unserem Büro. Kartenzahlung ist nach Vereinbarung möglich.
                </p>
                <p>
                  <strong>2.3 Preisänderungen:</strong> Preiserhöhungen sind bis 20 Tage vor Reiseantritt möglich, 
                  wenn sich Beförderungskosten, Abgaben oder Wechselkurse ändern.
                </p>
              </div>
            </section>

            {/* Stornierung und Rücktritt */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">3. Stornierung und Rücktritt</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="mb-4">
                  <strong>3.1 Stornierung durch den Kunden:</strong> Sie können jederzeit vor Reisebeginn 
                  vom Vertrag zurücktreten. Es gelten folgende Stornogebühren:
                </p>
                <ul className="mb-4 pl-6">
                  <li>bis 30 Tage vor Reiseantritt: 10% des Reisepreises</li>
                  <li>29-15 Tage vor Reiseantritt: 25% des Reisepreises</li>
                  <li>14-8 Tage vor Reiseantritt: 50% des Reisepreises</li>
                  <li>7-1 Tag vor Reiseantritt: 75% des Reisepreises</li>
                  <li>am Abreisetag oder Nichtantritt: 90% des Reisepreises</li>
                </ul>
                <p>
                  <strong>3.2 Reiserücktrittsversicherung:</strong> Wir empfehlen den Abschluss einer 
                  Reiserücktrittsversicherung zum Schutz vor unvorhergesehenen Ereignissen.
                </p>
              </div>
            </section>

            {/* Leistungen und Haftung */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">4. Leistungen und Haftung</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="mb-4">
                  <strong>4.1 Leistungsumfang:</strong> Der Umfang unserer Leistungen ergibt sich aus der 
                  Reiseausschreibung und der Buchungsbestätigung.
                </p>
                <p className="mb-4">
                  <strong>4.2 Haftung:</strong> Wir haften für die ordnungsgemäße Erbringung der vertraglich 
                  vereinbarten Reiseleistungen. Die Haftung ist auf den dreifachen Reisepreis begrenzt.
                </p>
                <p>
                  <strong>4.3 Gewährleistung:</strong> Mängel sind unverzüglich der Reiseleitung oder unserem 
                  Büro zu melden, damit Abhilfe geschaffen werden kann.
                </p>
              </div>
            </section>

            {/* Kontakt */}
            <section className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Fragen zu den AGB?</h2>
              <p className="text-gray-700 mb-4 text-sm">
                Bei Fragen zu unseren Allgemeinen Geschäftsbedingungen stehen wir Ihnen gerne zur Verfügung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center text-sm">
                  <div className="bg-accent/20 p-2 rounded-lg mr-3">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <span className="font-medium">0732 27 27 17</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="bg-accent/20 p-2 rounded-lg mr-3">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <span className="font-medium">linz@platzl-reisen.at</span>
                </div>
              </div>
            </section>
          </div>

          {/* Stand */}
          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>Stand: Januar 2024 | Platzl Reisen GmbH</p>
          </div>
        </div>
      </div>
    </div>
  );
};