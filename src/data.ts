export const DEPARTMENTS = [
  { id: 'general', name: 'General Dentistry', description: 'Comprehensive routine dental care, exams, and cleanings.', icon: 'Stethoscope' },
  { id: 'orthodontics', name: 'Orthodontics', description: 'Braces, aligners, and bite correction therapies.', icon: 'Smile' },
  { id: 'surgery', name: 'Oral Surgery', description: 'Extractions, implants, and complex surgical procedures.', icon: 'Activity' },
  { id: 'cosmetic', name: 'Cosmetic Dentistry', description: 'Teeth whitening, veneers, and smile makeovers.', icon: 'Star' },
  { id: 'pediatric', name: 'Pediatric Dentistry', description: 'Specialized dental care for infants, children, and teens.', icon: 'Baby' },
];

export const DOCTORS = [
  { 
    id: 'doc1', 
    name: 'DR.Nitin', 
    title: 'Lead General Dentist', 
    department: 'general', 
    specialization: 'Senior Prosthodontist & Implantologist',
    bio: 'With over 15 years of experience, Dr. Nitin specializes in complex dental reconstructions and advanced implant surgery. He is known for his precise technique and compassionate patient care.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'doc2', 
    name: 'Dr. Mark Davis', 
    title: 'Orthodontist', 
    department: 'orthodontics', 
    specialization: 'Orthodontic Specialist',
    bio: 'Dr. Mark Davis focuses on correcting dental irregularities using the latest in orthodontic technology.',
    image: 'https://picsum.photos/seed/mark/400/400' 
  },
  { 
    id: 'doc3', 
    name: 'Dr. Emily Chen', 
    title: 'Oral Surgeon', 
    department: 'surgery', 
    specialization: 'Oral and Maxillofacial Surgeon',
    bio: 'Dr. Emily Chen is an expert in surgical dentistry, focusing on patient comfort and recovery.',
    image: 'https://picsum.photos/seed/emily/400/400' 
  },
  { 
    id: 'doc4', 
    name: 'Dr. Robert Williams', 
    title: 'Cosmetic Dentist', 
    department: 'cosmetic', 
    specialization: 'Aesthetic Dentistry',
    bio: 'Dr. Robert Williams specializes in smile makeovers and advanced cosmetic procedures.',
    image: 'https://picsum.photos/seed/robert/400/400' 
  },
  { 
    id: 'doc5', 
    name: 'Dr. Lisa Miller', 
    title: 'Pediatric Dentist', 
    department: 'pediatric', 
    specialization: 'Pediatric Oral Health',
    bio: 'Dr. Lisa Miller is dedicated to making dental visits a fun and stress-free experience for children.',
    image: 'https://picsum.photos/seed/lisa/400/400' 
  },
  { 
    id: 'doc6', 
    name: 'DR. Talha', 
    title: 'General Dentist', 
    department: 'general', 
    specialization: 'Family Dentistry',
    bio: 'Dr. Talha is dedicated to creating beautiful smiles through modern dental care for all ages.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop' 
  },
];

export const BLOG_POSTS = [
  { 
    id: 1, 
    title: 'The Science of Smile Makeovers: Why Modern Veneers are a Game Changer', 
    date: 'April 22, 2026', 
    author: 'Dr. Robert Williams', 
    excerpt: 'Modern veneers have evolved significantly from the bulky, unnatural-looking options of the past. Today, ultra-thin porcelain veneers can correct chips, gaps, and deep staining with minimal preparation of the natural tooth. Discover how digital smile design allows us to preview your results before the procedure even begins.', 
    image: '/assets/blog1.png' 
  },
  { 
    id: 2, 
    title: 'Beyond the Brush: How Your Oral Health Impacts Your Whole Body', 
    date: 'April 10, 2026', 
    author: 'Dr. Emily Chen', 
    excerpt: 'Did you know that gum disease is linked to heart health and diabetes? The mouth is the gateway to your body, and chronic inflammation in the gums can have systemic effects. Learn about the latest research on the oral-systemic connection and why a professional cleaning is more than just a cosmetic fix.', 
    image: '/assets/blog2.png' 
  },
  { 
    id: 3, 
    title: 'Pediatric Dentistry: Creating a Positive First Experience for Your Child', 
    date: 'March 28, 2026', 
    author: 'Dr. Lisa Miller', 
    excerpt: 'A child\'s first visit to the dentist sets the tone for their lifelong dental health. At LifeTime Smiles Clinic, we use a "tell-show-do" approach to build trust and reduce anxiety. From our kid-friendly treatment rooms to our gentle examination techniques, we make sure your little one leaves with a smile.', 
    image: '/assets/blog3.png' 
  },
];

export const TESTIMONIALS = [
  { id: 1, text: "The team at Enamel Care is fantastic! I've always had anxiety about the dentist, but they made me feel completely at ease.", name: 'Jessica T.' },
  { id: 2, text: "State-of-the-art facility and incredibly professional staff. Highly recommend for any complex procedures.", name: 'Michael B.' },
  { id: 3, text: "Got my veneers done here and I couldn't be happier with the results! My smile looks natural and perfect.", name: 'Samantha P.' },
];
