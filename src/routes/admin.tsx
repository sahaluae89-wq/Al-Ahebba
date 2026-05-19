import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AdminSidebar, AdminSidebarContent } from '@/components/admin/AdminSidebar'
import { toast } from 'sonner'
import { Loader2, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    if (typeof window !== 'undefined') {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw redirect({
          to: '/login',
        })
      }
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast.error('You must be logged in to access this page')
        navigate({ to: '/login' })
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate({ to: '/login' })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b p-4">
        <span className="font-bold text-lg tracking-tight">Admin Panel</span>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AdminSidebarContent onNavigate={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
