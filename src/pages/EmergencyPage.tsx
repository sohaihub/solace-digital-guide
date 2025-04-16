
import PageContainer from '@/components/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  Clock, 
  Info, 
  AlertTriangle,
  Shield,
  ExternalLink,
  BookOpen,
  Heart
} from 'lucide-react';

const emergencyResources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 support for people in distress, prevention and crisis resources.",
    website: "https://988lifeline.org",
    icon: Phone,
    isPrimary: true
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 text line for those in crisis.",
    website: "https://www.crisistextline.org",
    icon: MessageCircle,
    isPrimary: true
  },
  {
    name: "SAMHSA's National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service for individuals facing mental health or substance use disorders.",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    icon: Phone,
    isPrimary: false
  },
  {
    name: "NAMI HelpLine",
    phone: "1-800-950-6264",
    description: "Information, resource referrals and support for people living with mental health conditions.",
    website: "https://www.nami.org/help",
    icon: Info,
    isPrimary: false
  },
  {
    name: "Veterans Crisis Line",
    phone: "988, Press 1",
    description: "Connects veterans and their families in crisis with qualified responders.",
    website: "https://www.veteranscrisisline.net",
    icon: Phone,
    isPrimary: false
  }
];

const warningSignsList = [
  "Talking about wanting to die or kill oneself",
  "Looking for ways to kill oneself, such as searching online or buying a gun",
  "Talking about feeling hopeless or having no reason to live",
  "Talking about feeling trapped or in unbearable pain",
  "Talking about being a burden to others",
  "Increasing the use of alcohol or drugs",
  "Acting anxious or agitated; behaving recklessly",
  "Sleeping too little or too much",
  "Withdrawing or feeling isolated",
  "Showing rage or talking about seeking revenge",
  "Displaying extreme mood swings"
];

const supportStepsList = [
  "Take threats or talk of suicide seriously",
  "Stay with the person and call for help",
  "Remove any firearms, alcohol, drugs, or sharp objects",
  "Listen without judgment",
  "Don't promise to keep their suicidal thoughts a secret",
  "Express concern and remind them they're not alone",
  "Avoid debating whether suicide is right or wrong",
  "Be direct – ask if they are considering suicide",
  "Get professional help, even if they resist",
  "Follow up and stay connected after a crisis"
];

const resourceLinks = [
  {
    title: "Mental Health First Aid",
    url: "https://www.mentalhealthfirstaid.org",
    description: "Learn how to identify, understand and respond to signs of mental health challenges"
  },
  {
    title: "Active Minds",
    url: "https://www.activeminds.org",
    description: "Resources for mental health awareness and education"
  },
  {
    title: "Mental Health America",
    url: "https://mhanational.org",
    description: "Tools, screening, and resources to support mental health"
  },
  {
    title: "Psychology Today Therapist Finder",
    url: "https://www.psychologytoday.com/us/therapists",
    description: "Directory to find therapists in your area"
  }
];

export default function EmergencyPage() {
  return (
    <PageContainer className="bg-red-50/30">
      <div className="max-w-5xl mx-auto">
        <div className="bg-red-600 text-white rounded-lg p-6 flex items-center gap-4 mb-8">
          <AlertTriangle className="h-10 w-10 flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold">Emergency Resources</h1>
            <p className="text-red-100">
              If you or someone you know is in immediate danger, call emergency services (911) now.
              Do not wait.
            </p>
          </div>
        </div>

        {/* Crisis Hotlines */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Crisis Hotlines & Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyResources
              .filter(resource => resource.isPrimary)
              .map((resource, index) => (
                <Card key={index} className="border-l-4 border-l-red-500 shadow-md">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <resource.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="text-lg font-bold">{resource.name}</h3>
                    </div>
                    
                    <p className="text-xl font-bold text-red-600 mb-2">{resource.phone}</p>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {emergencyResources
              .filter(resource => !resource.isPrimary)
              .map((resource, index) => (
                <Card key={index} className="shadow-sm">
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{resource.name}</h3>
                    <p className="text-red-600 font-medium mb-1">{resource.phone}</p>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    
                    <Button variant="ghost" size="sm" asChild className="text-xs">
                      <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Website
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </section>

        {/* Warning Signs */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <h2 className="text-xl font-bold">Warning Signs to Watch For</h2>
              </div>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {warningSignsList.map((sign, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-amber-100 text-amber-600 rounded-full p-1 mt-0.5">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-mindful-600" />
                <h2 className="text-xl font-bold">How to Support Someone in Crisis</h2>
              </div>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {supportStepsList.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-mindful-100 text-mindful-600 rounded-full p-1 mt-0.5">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceLinks.map((resource, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-mindful-600" />
                  <h3 className="font-semibold">{resource.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                
                <Button variant="link" size="sm" asChild className="p-0">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <Card className="p-6 bg-white/70 mb-8">
          <div className="flex">
            <div className="flex-shrink-0 text-center mr-6">
              <Clock className="h-10 w-10 text-gray-500 mx-auto" />
              <span className="block mt-1 text-sm font-medium">24/7</span>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Available Any Time</h3>
              <p className="text-gray-700">
                All of the crisis resources listed above are available 24 hours a day, 7 days a week.
                Don't hesitate to reach out, even if it's the middle of the night.
                Help is always available.
              </p>
            </div>
          </div>
        </Card>

        {/* Self-Care Reminder */}
        <Card className="p-6 border-l-4 border-l-mindful-500">
          <div className="flex items-start gap-4">
            <Heart className="h-8 w-8 text-mindful-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Remember Self-Care</h3>
              <p className="text-gray-700 mb-3">
                If you're supporting someone in crisis, remember to take care of your own mental health too.
                Set boundaries, seek support for yourself, and practice regular self-care.
              </p>
              <Button asChild className="btn-primary">
                <a href="/chat">Chat with AI Support</a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
