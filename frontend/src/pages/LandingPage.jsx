import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import {
  Code2,
  Users,
  Zap,
  Lock,
  Globe,
  Terminal,
} from 'lucide-react';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      
      {/* Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-xl bg-gray-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>

            <span className="text-xl text-white font-semibold">
              CodeSync
            </span>
          </Link>

          <div className="flex items-center gap-4">
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedOut>
              <SignUpButton mode="modal">
                <Button variant="primary">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
          ✨ Real-time collaboration for developers
        </div>

        <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent font-bold">
          Code Together in Real Time
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          The most powerful collaborative code editor for teams.
          Write, review, and ship code together with real-time synchronization.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">

          {/* Editor Workspace */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="secondary" size="lg">
                <Terminal className="w-5 h-5" />
                Editor Workspace
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link to="/EditorWorkspace">
              <Button variant="secondary" size="lg">
                <Terminal className="w-5 h-5" />
                Editor Workspace
              </Button>
            </Link>
          </SignedIn>

          {/* Dashboard */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="primary" size="lg">
                Dashboard
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                Dashboard
              </Button>
            </Link>
          </SignedIn>

        </div>

        {/* Code Preview */}
        <div className="relative max-w-5xl mx-auto">
          
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-20 rounded-3xl"></div>

          <div className="relative rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-xl p-2 shadow-2xl">
            
            <div className="bg-gray-950 rounded-xl overflow-hidden">

              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <span className="text-sm text-gray-500 ml-4">
                  App.tsx
                </span>
              </div>

              <div className="p-6 text-left font-mono text-sm">
                
                <div className="text-purple-400">export</div>{' '}
                <div className="inline text-purple-400">function</div>{' '}
                <div className="inline text-yellow-400">Hero</div>
                <div className="inline text-gray-400">() {'{'}</div>

                <div className="ml-4 mt-2">
                  <span className="text-purple-400">return</span> {'<'}
                  <span className="text-pink-400">div</span>{' '}
                  <span className="text-orange-400">className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">"</span>
                </div>

                <div className="ml-8 text-gray-500">
                  {'//'} Tailwind utility classes
                </div>

                <div className="ml-8">
                  <span className="text-green-400">
                    flex items-center justify-center
                  </span>
                </div>

                <div className="ml-8">
                  <span className="text-green-400">
                    bg-gradient-to-r from-blue-600
                  </span>
                </div>

                <div className="ml-8">
                  <span className="text-green-400">
                    to-purple-600 text-white p-8
                  </span>
                </div>

                <div className="ml-4">
                  <span className="text-green-400">"</span>
                  <span className="text-gray-400">{'>'}</span>
                </div>

                <div className="ml-8">
                  {'<'}
                  <span className="text-pink-400">h1</span>
                  {'>'}
                  <span className="text-white">Code Together!</span>
                  {'</'}
                  <span className="text-pink-400">h1</span>
                  {'>'}
                </div>

                <div className="ml-4">
                  {'</'}
                  <span className="text-pink-400">div</span>
                  {'>'}
                </div>

                <div>{'}'}</div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-white">
            Built for Modern Teams
          </h2>

          <p className="text-gray-400 text-lg">
            Everything you need to code together seamlessly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>

            <h3 className="text-xl mb-3 text-white">
              Real-Time Collaboration
            </h3>

            <p className="text-gray-400">
              See your teammates' cursors and edits as they type.
              No more merge conflicts.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>

            <h3 className="text-xl mb-3 text-white">
              Lightning Fast
            </h3>

            <p className="text-gray-400">
              Powered by cutting-edge technology for instant synchronization across the globe.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-pink-400" />
            </div>

            <h3 className="text-xl mb-3 text-white">
              Secure by Default
            </h3>

            <p className="text-gray-400">
              End-to-end encryption ensures your code stays private and protected.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gray-900/50 backdrop-blur-xl mt-20">
        
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-sm text-gray-400">
          © 2026 CodeSync. All rights reserved.
        </div>

      </footer>
    </div>
  );
}