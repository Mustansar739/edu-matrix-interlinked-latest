import { 
  Users, 
  School, 
  BookOpen, 
  Briefcase, 
  Globe, 
  GraduationCap,
  LayoutGrid,
  MessageCircle,
  ChartBar,
  Brain,
  Target,
  Shield,
  Star,
  Zap,
  Check,
  ArrowRight,
  Award,
  Lightbulb,
  TrendingUp,
  Network,
  Building2,
  Rocket,
  Clock,
  Layers,
  Sparkles,
  Activity,
  Database,
  Lock,
  Play,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Laptop,
  Newspaper,
  MessageSquare,
  Mail,
  BarChart
} from "lucide-react";

import SocketConnectionTester from "@/components/socket-connection-tester";

// Core Service Pillars - Enterprise Scale (4 Pillars)
const corePillars = [
  {
    icon: <Network className="h-12 w-12" />,
    title: "Social Learning Network",
    subtitle: "Connect. Collaborate. Create.",
    description: "Join a vibrant community of learners, educators, and innovators. Share knowledge, collaborate on projects, and build lasting professional relationships in our Facebook-like educational ecosystem.",
    features: ["Real-time messaging", "Study groups", "Peer mentoring", "Knowledge sharing"],
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
    href: "/students-interlinked",
    badge: "Community Driven"
  },
  {
    icon: <Building2 className="h-12 w-12" />,    title: "Institutional Management",
    subtitle: "Each Institution. Unique Identity.",
    description: "Comprehensive management system for schools, colleges, and universities. Each institution gets a unique ID with isolated data management, ensuring privacy and security while being part of the unified ecosystem. Complete control over curriculum, students, faculty, and operations.",
    features: ["Unique Institution IDs", "Isolated data per institution", "Complete academic management", "Student & faculty portals", "Curriculum management", "Reports & analytics"],
    gradient: "from-purple-600 via-indigo-500 to-blue-600",
    href: "/edu-matrix-hub",
    badge: "Institution Focused"
  },
  {
    icon: <MessageCircle className="h-12 w-12" />,
    title: "Community Room",
    subtitle: "Connect. Discuss. Discover.",
    description: "Dynamic community spaces where learners connect based on interests, solve problems together, and engage in voice chat rooms. Find like-minded individuals, join study groups, and participate in real-time discussions across various educational topics.",
    features: ["Interest-based matching", "Voice chat rooms", "Problem-solving forums", "Real-time discussions", "Study group formation", "Expert Q&A sessions"],
    gradient: "from-green-600 via-emerald-500 to-teal-500",
    href: "/community-room",
    badge: "Interactive Learning"
  },
  {
    icon: <Rocket className="h-12 w-12" />,
    title: "Career Services Hub",
    subtitle: "Learn. Freelance. Succeed.",
    description: "Bridge the gap between education and career success. Access job opportunities, freelance projects, professional courses, and industry connections tailored to your skills and aspirations.",
    features: ["Job marketplace", "Freelance platform", "Professional courses", "Career guidance"],
    gradient: "from-orange-500 via-pink-500 to-red-500",
    href: "/jobs",
    badge: "Career Focused"
  }
];

// Real-time System Features
const systemFeatures = [
  {
    icon: <Activity className="h-8 w-8" />,
    title: "Real-Time Everything",
    description: "Live notifications, instant messaging, voice chat rooms, real-time collaboration, and dynamic content updates across the entire platform.",
    stats: "< 100ms latency"
  },  {
    icon: <Database className="h-8 w-8" />,
    title: "Unified Architecture",
    description: "10 specialized database schemas working together seamlessly, with institutional data isolation only where needed for privacy.",
    stats: "10 integrated schemas"
  },  {
    icon: <Lock className="h-8 w-8" />,
    title: "Smart Security",
    description: "Advanced authentication and role-based access control with institution-level privacy for academic data and open collaboration for social features.",
    stats: "Bank-level security"
  },  {
    icon: <MessageCircle className="h-8 w-8" />,
    title: "Complete Ecosystem",
    description: "All educational needs integrated into one cohesive platform - from social learning to institutional management to career development.",
    stats: "4 core pillars"
  }
];

// Enhanced Statistics with Real-Time Context
const liveStats = [
  { 
    number: "50K+", 
    label: "Active Learners", 
    icon: <Users className="h-8 w-8" />,
    description: "Students actively engaging across institutions",
    growth: "+15% this month"
  },  { 
    number: "200+", 
    label: "Institutions", 
    icon: <School className="h-8 w-8" />,
    description: "Educational institutions with isolated data",
    growth: "+25% this quarter"
  },
  { 
    number: "500+", 
    label: "Active Voice Rooms", 
    icon: <MessageCircle className="h-8 w-8" />,
    description: "Live community voice chat sessions",
    growth: "24/7 activity"
  },
  { 
    number: "99.9%", 
    label: "Uptime", 
    icon: <Monitor className="h-8 w-8" />,
    description: "Enterprise-grade reliability guarantee",
    growth: "SLA guaranteed"
  }
];

// Quick Access Services
const quickServices = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Community Room",
    description: "Voice chat rooms, interest-based matching, and collaborative problem-solving spaces",
    href: "/community-room"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Edu News",
    description: "Latest educational news and industry updates",
    href: "/edu-news"
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Interactive Courses",
    description: "Hands-on learning with real-time feedback",
    href: "/courses"
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Freelancing Hub",
    description: "Educational freelance opportunities",
    href: "/freelancing"
  },
  {
    icon: <ChartBar className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Real-time insights and performance metrics",
    href: "/stats"
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Assistance",
    description: "Intelligent tutoring and automated support",
    href: "/ai-assistant"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* Hero Section - Enterprise Vision */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-purple-50/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-600/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-300/10 to-blue-400/10 blur-3xl animate-pulse delay-2000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Live Status Indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-8">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Live System • Real-time Updates Active</span>
              </div>

              {/* Main Hero Title */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                <span className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                    EDU MATRIX
                  </span>
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl mt-2 text-gray-700 dark:text-gray-300">
                  INTERLINKED
                </span>
              </h1>                {/* Enterprise Tagline */}
              <div className="mb-8">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  One Unified Educational Ecosystem
                </p>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
                  Connecting students, teachers, schools, colleges, and universities in one powerful platform. Learn socially, manage institutions, engage in communities, and build successful careers - all in one place.
                </p>
              </div>
              
              {/* Value Proposition Card */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="relative p-8 bg-gradient-to-r from-white/90 via-blue-50/80 to-indigo-50/90 dark:from-gray-800/90 dark:via-gray-700/80 dark:to-gray-800/90 backdrop-blur-sm rounded-3xl border border-blue-200/50 dark:border-gray-600/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-3xl"></div>
                  <div className="relative">                    <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-300 mb-6">
                      Four Pillars • One Ecosystem • Unlimited Possibilities
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                      <div className="flex flex-col items-center">
                        <Network className="h-8 w-8 text-blue-600 mb-2" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Social Learning</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Building2 className="h-8 w-8 text-purple-600 mb-2" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Institution Management</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Community Rooms</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Rocket className="h-8 w-8 text-orange-600 mb-2" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Career Services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="/auth/register"
                  className="group relative inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Play className="mr-3 h-6 w-6" />
                  Start Your Journey
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-500 group-hover:translate-x-2" />
                </a>
                <a
                  href="/students-interlinked"
                  className="inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl text-gray-700 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <ExternalLink className="mr-3 h-6 w-6" />
                  Explore Platform
                </a>
              </div>
            </div>
          </div>
        </section>        {/* Core Pillars Section - Enterprise Architecture */}
        <section className="py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6">
                Four Pillars. One Ecosystem.
              </h2>              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Experience the complete educational journey through our four integrated pillars, all connected in one unified platform for students, teachers, and institutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {corePillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden"
                >
                  {/* Pillar Card */}
                  <div className="relative h-full p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-100 dark:border-gray-700">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl`} />
                    
                    {/* Badge */}
                    <div className="absolute top-6 right-6">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${pillar.gradient} text-white`}>
                        {pillar.badge}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${pillar.gradient} text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      {pillar.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">
                      {pillar.subtitle}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {pillar.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-2 mb-8">
                      {pillar.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA */}
                    <a
                      href={pillar.href}
                      className={`inline-flex items-center font-bold text-transparent bg-clip-text bg-gradient-to-r ${pillar.gradient} group-hover:translate-x-2 transition-transform duration-500`}
                    >
                      Explore Platform
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* System Features - Technical Excellence */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6">
                Enterprise-Grade Infrastructure
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Built with cutting-edge technology for scalability, security, and real-time performance at enterprise scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {systemFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm transform scale-105"></div>
                  
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500 mb-6">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{feature.stats}</span>
                  </div>
                </div>              ))}
            </div>
          </div>
        </section>        {/* Unified System Services */}
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-slate-800/20 to-gray-900/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-slate-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-600/10 to-slate-600/10 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#334155" fill-opacity="0.05"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`
              }}></div>
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-slate-700/40 to-gray-700/40 backdrop-blur-sm rounded-full border border-slate-600/30">
                <span className="text-slate-300 font-semibold text-sm tracking-wide uppercase">Complete Ecosystem</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                One Unified System Provides
                <span className="block text-4xl md:text-5xl text-slate-300 font-light mt-2">These Services</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
                Building a unified educational ecosystem is not an easy task. Our comprehensive platform integrates multiple specialized services into one seamless experience.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {/* Students Interlinked */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl border border-blue-600/30">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Students Interlinked</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Social Network</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Connect students worldwide with secure social networking, study groups, and peer collaboration tools.
                </p>
              </div>

              {/* EDU Matrix Hub */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-600/20 to-indigo-700/20 rounded-xl border border-indigo-600/30">
                    <Building2 className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">EDU Matrix Hub</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Institution Management</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Complete multi-tenant system for educational institutions with isolated data, custom branding, and enterprise features.
                </p>
              </div>

              {/* Courses */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-xl border border-emerald-600/30">
                    <BookOpen className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Courses</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Learning Platform</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Comprehensive course management with video lectures, assignments, assessments, and progress tracking.
                </p>
              </div>

              {/* Jobs */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-xl border border-orange-600/30">
                    <Briefcase className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Jobs</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Career Portal</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Career opportunities platform connecting students with employers, internships, and professional development.
                </p>
              </div>

              {/* Freelancing */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600/20 to-purple-700/20 rounded-xl border border-purple-600/30">
                    <Laptop className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Freelancing</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Gig Economy</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Freelance marketplace for students and professionals to offer services and find project-based work.
                </p>
              </div>

              {/* Edu News */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 rounded-xl border border-cyan-600/30">
                    <Newspaper className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Edu News</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Information Hub</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Latest educational news, research updates, policy changes, and industry insights for the academic community.
                </p>
              </div>

              {/* Community Room */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-teal-600/20 to-teal-700/20 rounded-xl border border-teal-600/30">
                    <MessageSquare className="h-6 w-6 text-teal-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Community Room</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Discussion Forum</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Voice chat rooms, interest-based communities, problem-solving forums, and collaborative discussion spaces.
                </p>
              </div>

              {/* Messages */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-rose-600/20 to-rose-700/20 rounded-xl border border-rose-600/30">
                    <Mail className="h-6 w-6 text-rose-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Messages</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Communication</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Real-time messaging system with private chats, group conversations, and file sharing capabilities.
                </p>
              </div>

              {/* Stats */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-amber-600/20 to-amber-700/20 rounded-xl border border-amber-600/30">
                    <BarChart className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Stats</h3>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Analytics</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Comprehensive analytics dashboard with platform statistics, user insights, and performance metrics.
                </p>
              </div>
            </div>

            {/* Technical Excellence Section */}
            <div className="max-w-6xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-slate-600/10 via-gray-600/10 to-slate-600/10 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative p-12 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 group-hover:border-slate-600/70 transition-all duration-700">
                  <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold text-white mb-4">
                      Why This Unified Approach Works
                    </h3>
                    <p className="text-slate-400 text-lg">
                      Integrating multiple educational services into one platform requires sophisticated architecture
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full mx-auto mt-6"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="group/item flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-slate-500/20">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl border border-blue-600/30">
                        <CheckCircle2 className="h-7 w-7 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-white mb-2 group-hover/item:text-blue-300 transition-colors duration-300">Seamless Integration</h4>
                        <p className="text-slate-300 text-base leading-relaxed">All services share unified authentication, user profiles, and data consistency across the entire platform</p>
                      </div>
                    </div>
                    
                    <div className="group/item flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-slate-500/20">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-indigo-600/20 to-indigo-700/20 rounded-xl border border-indigo-600/30">
                        <CheckCircle2 className="h-7 w-7 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-white mb-2 group-hover/item:text-indigo-300 transition-colors duration-300">Scalable Architecture</h4>
                        <p className="text-slate-300 text-base leading-relaxed">Microservices architecture allows independent scaling of each service based on demand and usage patterns</p>
                      </div>
                    </div>
                    
                    <div className="group/item flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-slate-500/20">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-xl border border-emerald-600/30">
                        <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-white mb-2 group-hover/item:text-emerald-300 transition-colors duration-300">Data Security</h4>
                        <p className="text-slate-300 text-base leading-relaxed">Enterprise-grade security with role-based access, data encryption, and compliance with educational regulations</p>
                      </div>
                    </div>
                    
                    <div className="group/item flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-slate-500/20">
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-xl border border-orange-600/30">
                        <CheckCircle2 className="h-7 w-7 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-white mb-2 group-hover/item:text-orange-300 transition-colors duration-300">Real-time Performance</h4>
                        <p className="text-slate-300 text-base leading-relaxed">WebSocket connections, real-time notifications, and optimized database queries ensure instant responsiveness</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-700/50">
                    <div className="flex justify-center">
                      <div className="w-32 h-1 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Services Grid */}
        <section className="py-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Complete Educational Toolkit
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Access all educational services from a single, integrated platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickServices.map((service, index) => (
                <a
                  key={service.title}
                  href={service.href}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>        {/* Live Statistics Dashboard */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-16">
              <h2 className="text-5xl font-black text-white mb-6">
                Live Platform Metrics
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Real-time statistics showcasing our growing educational ecosystem
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {liveStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  
                  {/* Number */}
                  <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-blue-100 font-semibold mb-3">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <p className="text-blue-200 text-sm mb-3">
                    {stat.description}
                  </p>
                  
                  {/* Growth Indicator */}
                  <div className="inline-flex items-center px-3 py-1 bg-green-500/20 rounded-full">
                    <span className="text-xs font-bold text-green-200">{stat.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Enterprise Ready */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
            <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/10 to-indigo-600/10 blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-8 leading-tight">
                Ready to Lead the Future of Education?
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Join the educational revolution. Connect, learn, and grow in our enterprise-scale ecosystem designed for institutions, educators, and students worldwide.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Instant Setup</h3>
                  <p className="text-gray-400 text-sm">Get started in minutes, not days</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Enterprise Security</h3>
                  <p className="text-gray-400 text-sm">Bank-level security for your data</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white mb-4">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Intelligent features that adapt to you</p>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="/auth/register"
                  className="group relative inline-flex items-center px-12 py-6 text-xl font-bold rounded-2xl text-gray-900 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Rocket className="mr-3 h-6 w-6" />
                  Join the Ecosystem
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-500 group-hover:translate-x-2" />
                </a>
                <a
                  href="/auth/signin"
                  className="inline-flex items-center px-12 py-6 text-xl font-bold rounded-2xl text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <ExternalLink className="mr-3 h-6 w-6" />
                  Access Platform
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-16 pt-8 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-4">Trusted by educational institutions worldwide</p>
                <div className="flex justify-center items-center space-x-8 text-gray-500">
                  <span className="text-2xl font-bold">200+ Institutions</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-2xl font-bold">50K+ Active Users</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-2xl font-bold">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Socket.IO Demo Section (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <section className="py-20 bg-gray-100 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Development Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time connection testing and monitoring
                </p>
              </div>              <SocketConnectionTester />
            </div>
          </section>
        )}
      </div>
  );
}
