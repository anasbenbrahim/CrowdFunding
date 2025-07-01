"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Home,
  Users,
  FolderOpen,
  Plus,
  Settings,
  LogOut,
  User,
  CreditCard,
  Menu,
  X,
  LogIn,
} from "lucide-react";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState({
    name: "Marie Dubois",
    email: "marie@example.com",
    avatar: "/placeholder.svg",
  });
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Campaigns", href: "/campaigns", icon: FolderOpen },
    { name: "Communities", href: "/communities", icon: Users },
    { name: "Payments", href: "/payments", icon: CreditCard },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16 rounded-lg object-cover"
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Link to="/create-project">
                <Button size="sm" className="hidden sm:flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Nouveau Projet
                </Button>
              </Link>

              {/* Login Button */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center"
                onClick={() => {
                  // Just for decoration - no functionality yet
                  console.log("Login clicked (decoration only)");
                }}
              >
                <LogIn className="w-4 h-4 mr-1" />
                Connexion
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/create-project"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Plus className="w-5 h-5 mr-3" />
                Nouveau Projet
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  console.log("Login clicked (decoration only)");
                }}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 w-full text-left"
              >
                <LogIn className="w-5 h-5 mr-3" />
                Connexion
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#121137] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
            <p className="text-sm">
              La plateforme de crowdfunding communautaire qui connecte les
              porteurs de projets avec des communautés passionnées et engagées.
            </p>
            <div className="flex gap-6 mt-6 text-sm">
              <a href="#" className="hover:underline">
                Twitter
              </a>
              <a href="#" className="hover:underline">
                Linkedin
              </a>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </div>
          </div>

          {/* p links */}
          <div>
            <h4 className="font-semibold mb-3">Plateforme</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Explorer les projets
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Communautés
                </a>
              </li>
            </ul>
          </div>

          {/* s links */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Centre d’aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Condition d’utilisation
                </a>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </footer>
    </div>
  );
}
