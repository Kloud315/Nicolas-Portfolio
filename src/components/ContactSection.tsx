import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Briefcase, Users, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useContactInfo } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function ContactSection() {
  const { toast } = useToast();
  const { data: contactInfo, isLoading } = useContactInfo();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default contact info
  const email = contactInfo?.email || 'johnpatricknicolas15@gmail.com';
  const phone = contactInfo?.phone || '0960-035-6307 | 0951-277-0041';
  const location = contactInfo?.location || 'San Miguel A, Maragondon, Cavite';
  const linkedin = contactInfo?.linkedin || 'https://www.linkedin.com/in/john-patrick-nicolas-29b522388/';
  const github = contactInfo?.github;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Getform.io (Vercel-friendly)
      const formDataToSend = new FormData();
      formDataToSend.append('fi-sender-fullName', formData.name);
      formDataToSend.append('fi-sender-email', formData.email);
      formDataToSend.append('fi-text-subject', formData.subject);
      formDataToSend.append('fi-text-message', formData.message);

      const response = await fetch('https://getform.io/f/kjm1esysvi4', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: "Thank you for reaching out. I'll get back to you soon.",
        });

        // Clear form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Fallback to mailto
      try {
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        
        const mailtoLink = `mailto:johnpatricknicolas15@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;

        toast({
          title: 'Opening email client...',
          description: 'Your default email app should open with message ready to send.',
        });
      } catch (mailtoError) {
        toast({
          title: 'Please email directly',
          description: 'Email to: johnpatricknicolas15@gmail.com with your message',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-background to-secondary/10 relative">
      {/* Minimalist background decoration */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-accent/3 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Minimalist Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-20 transition-all duration-1200 ${
              headerVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
            }`}
          >
            <span className="text-primary text-xs font-light tracking-widest uppercase mb-6 block">
              Let's Connect
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Get In <span className="text-primary font-light">Touch</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Open to internships, software engineering roles, AI opportunities, and startup collaborations
            </p>
          </div>

          <div 
            ref={contentRef}
            className={`grid lg:grid-cols-3 gap-12 lg:gap-16 transition-all duration-1200 delay-200 ${
              contentVisible ? 'scroll-reveal-scale is-visible' : 'scroll-reveal-scale'
            }`}
          >
            {/* Minimalist Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-medium text-foreground mb-4">Contact Information</h3>
                <p className="text-muted-foreground font-light mb-8">
                  I'm always excited to discuss new opportunities, collaborations, and innovative projects.
                </p>
              </div>

              {/* Professional Availability */}
              <div className="p-6 border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground">Professional Availability</h4>
                </div>
                <ul className="space-y-4 text-sm text-muted-foreground font-light">
                  <li className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    Software Engineering Internships
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    AI Full Stack Development Roles
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    Startup Collaborations
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    Project Consultations
                  </li>
                </ul>
              </div>

              {/* Minimalist Contact Methods */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-light">Email</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {email}
                      </p>
                    </div>
                  </a>

                  <a href={`tel:${phone.split(' | ')[0]?.replace(/-/g, '')}`} className="group flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-500">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-light">Phone</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-light">Location</p>
                      <p className="text-foreground font-medium">{location}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-500 group"
                    >
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-light">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/Kloud315"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-500 group"
                    >
                      <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-light">GitHub</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Minimalist Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-8 border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-medium text-foreground mb-3">Send Me a Message</h3>
                  <p className="text-muted-foreground font-light mb-4">
                    I'll get back to you as soon as possible. Let's discuss how we can work together!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="mailto:johnpatricknicolas15@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Quick Email
                    </a>
                    <span className="inline-flex items-center justify-center text-sm text-muted-foreground font-light">
                      Or use the form below
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-3 font-light">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-3 font-light">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-3 font-light">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-500"
                      placeholder="Project Collaboration | Job Opportunity | General Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-3 font-light">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-input/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-500 resize-none"
                      placeholder="Tell me about your project, opportunity, or how we can collaborate..."
                    />
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground font-light">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Response within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>All inquiries welcome</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-white border-0 transition-all duration-500 font-light"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
