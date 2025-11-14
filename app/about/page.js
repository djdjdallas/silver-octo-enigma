import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export const metadata = {
  title: 'About SafeBaby | Our Mission to Keep Babies Safe',
  description: 'Learn about SafeBaby\'s mission to provide transparent, science-based information about heavy metals in baby food to help parents make safer choices.',
};

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Products Analyzed' },
    { number: '100+', label: 'Brands Tracked' },
    { number: '50,000+', label: 'Parents Helped' },
    { number: '24/7', label: 'Updated Data' },
  ];

  const values = [
    {
      icon: Icons.shield,
      title: 'Safety First',
      description: 'Every decision we make prioritizes the health and safety of babies.',
    },
    {
      icon: Icons.search,
      title: 'Transparency',
      description: 'We believe parents deserve clear, accessible information about what they feed their children.',
    },
    {
      icon: Icons.brain,
      title: 'Science-Based',
      description: 'Our ratings are based on independent lab testing and peer-reviewed research.',
    },
    {
      icon: Icons.users,
      title: 'Parent-Focused',
      description: 'Built by parents, for parents, with features that make safety checks quick and easy.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Icons.info className="w-8 h-8" />
            <Badge className="bg-white/20 text-white border-white/30">About Us</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Making Baby Food Safer
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            SafeBaby empowers parents with transparent, science-based information about heavy metals
            in baby food, helping families make safer feeding choices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-4">
                SafeBaby was founded with a simple but vital mission: to provide parents with the
                information they need to protect their babies from harmful heavy metals in food.
                We believe every parent has the right to know what's in the food they're feeding
                their children.
              </p>
              <p className="mb-4">
                Recent studies have shown that many popular baby foods contain concerning levels of
                heavy metals like lead, arsenic, cadmium, and mercury. These toxins can affect brain
                development, lower IQ, and cause behavioral problems. Yet this information is often
                hidden or hard to find.
              </p>
              <p>
                That's why we created SafeBaby - a free, easy-to-use platform that puts safety
                data at parents' fingertips. Using our barcode scanner or search function, parents
                can instantly check the safety rating of any baby food product and make informed
                decisions about what to feed their little ones.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Values */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Data Sources</h2>
            <p className="text-gray-600 mb-6">
              We aggregate and analyze data from multiple trusted sources to provide the most
              comprehensive and reliable safety ratings:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Consumer Reports</h4>
                  <p className="text-sm text-gray-600">
                    Independent testing of baby foods for heavy metals
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Healthy Babies Bright Futures</h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive studies on heavy metals in baby food
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">FDA Testing Data</h4>
                  <p className="text-sm text-gray-600">
                    Official government testing results and recalls
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">EPA-Certified Labs</h4>
                  <p className="text-sm text-gray-600">
                    Third-party laboratory testing results
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Team */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Team</h2>
            <p className="text-gray-600 mb-6">
              SafeBaby was created by a team of parents, pediatric health experts, and data
              scientists who came together with a shared goal: making baby food safety
              information accessible to all families.
            </p>
            <p className="text-gray-600 mb-6">
              Our team includes:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Parents who understand the daily challenges of feeding babies safely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Data scientists who analyze testing results from multiple sources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Pediatric nutritionists who provide guidance on safer alternatives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                <span>Software engineers committed to making safety data easily accessible</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* How We Can Help */}
        <Card className="mb-8 bg-primary-50 border-primary-200">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Can Help You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Icons.scan className="w-5 h-5 text-primary-600" />
                  Instant Safety Checks
                </h3>
                <p className="text-sm text-gray-600">
                  Scan any baby food barcode to instantly see its safety rating and heavy metal content.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Icons.brain className="w-5 h-5 text-primary-600" />
                  Smart Recommendations
                </h3>
                <p className="text-sm text-gray-600">
                  Get personalized suggestions for safer alternatives based on your baby's age and needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Icons.bell className="w-5 h-5 text-primary-600" />
                  Recall Alerts
                </h3>
                <p className="text-sm text-gray-600">
                  Stay informed about the latest recalls and safety updates for products you use.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Icons.bookOpen className="w-5 h-5 text-primary-600" />
                  Educational Resources
                </h3>
                <p className="text-sm text-gray-600">
                  Access guides, articles, and tips on reducing heavy metal exposure in your baby's diet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Join Us in Making Baby Food Safer
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Together, we can create a future where all babies have access to safe,
              healthy food. Start checking your baby's food today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scan"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Icons.scan className="w-5 h-5" />
                Start Scanning
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
              >
                <Icons.mail className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}