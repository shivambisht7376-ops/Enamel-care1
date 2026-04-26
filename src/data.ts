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
    image: '/assets/blog1.png',
    content: `
      <p>The field of cosmetic dentistry has undergone a massive transformation in the last decade. One of the most significant advancements has been in the material science and application of porcelain veneers.</p>
      <p>In the past, veneers often required significant removal of the natural tooth enamel to make room for the porcelain. This process was irreversible and sometimes led to tooth sensitivity. However, with modern <strong>lithium disilicate</strong> and <strong>zirconia-reinforced porcelain</strong>, we can now create veneers that are as thin as a contact lens but incredibly durable.</p>
      <h3>The Digital Smile Design (DSD) Advantage</h3>
      <p>At LifeTime Smiles Clinic, we utilize DSD technology. This allows us to take high-resolution digital scans and photos of your face and smile. Using specialized software, we design your new smile in 3D, taking into account your facial proportions and lip line.</p>
      <p>The best part? You can "try on" your smile using a physical mockup before any work is done. This ensures that the final result is exactly what you dreamed of.</p>
      <h3>Minimal Prep, Maximum Results</h3>
      <p>Because these modern materials are so strong even at very thin gauges, many cases can be "minimal-prep" or even "no-prep." This preserves more of your natural tooth structure and makes the process much more comfortable.</p>
    `
  },
  { 
    id: 2, 
    title: 'Beyond the Brush: How Your Oral Health Impacts Your Whole Body', 
    date: 'April 10, 2026', 
    author: 'Dr. Emily Chen', 
    excerpt: 'Did you know that gum disease is linked to heart health and diabetes? The mouth is the gateway to your body, and chronic inflammation in the gums can have systemic effects. Learn about the latest research on the oral-systemic connection and why a professional cleaning is more than just a cosmetic fix.', 
    image: '/assets/blog2.png',
    content: `
      <p>We often think of our teeth and gums as isolated from the rest of our body. However, the latest medical research shows a profound <strong>oral-systemic connection</strong>.</p>
      <p>The mouth is home to billions of bacteria. While most are harmless, poor oral hygiene can allow certain pathogenic bacteria to flourish. When gums become inflamed (gingivitis or periodontitis), they essentially become open wounds that allow these bacteria to enter the bloodstream.</p>
      <h3>The Heart Connection</h3>
      <p>Studies have shown that people with chronic gum disease are at a higher risk of developing heart disease. The theory is that the inflammation in the mouth causes inflammation in the blood vessels, leading to atherosclerosis (hardening of the arteries).</p>
      <h3>Diabetes and Gum Disease: A Two-Way Street</h3>
      <p>The relationship between diabetes and oral health is particularly strong. People with diabetes are more susceptible to gum infections. Conversely, severe gum disease can make it harder for diabetics to control their blood sugar levels. Managing your oral health is a critical component of managing diabetes.</p>
      <p>Regular professional cleanings do more than just make your teeth shine—they reduce the total bacterial load in your body and help keep your systemic health in check.</p>
    `
  },
  { 
    id: 3, 
    title: 'Pediatric Dentistry: Creating a Positive First Experience for Your Child', 
    date: 'March 28, 2026', 
    author: 'Dr. Lisa Miller', 
    excerpt: 'A child\'s first visit to the dentist sets the tone for their lifelong dental health. At LifeTime Smiles Clinic, we use a "tell-show-do" approach to build trust and reduce anxiety. From our kid-friendly treatment rooms to our gentle examination techniques, we make sure your little one leaves with a smile.', 
    image: '/assets/blog3.png',
    content: `
      <p>Building a healthy relationship with the dentist early in life is one of the best gifts you can give your child. Our pediatric department is designed to be a "No Fear Zone."</p>
      <h3>The "Tell-Show-Do" Method</h3>
      <p>We use a specialized technique called <strong>Tell-Show-Do</strong>. First, we tell the child what we are going to do using age-appropriate language (like calling the suction tool Mr. Thirsty). Then, we show them on a stuffed animal or their own hand. Finally, we do the procedure once they feel comfortable.</p>
      <h3>When Should the First Visit Happen?</h3>
      <p>The American Academy of Pediatric Dentistry recommends that a child should see the dentist by their first birthday or when their first tooth erupts. This "Age One Visit" is mostly about education and helping the child get used to the environment.</p>
      <p>At LifeTime Smiles Clinic, we focus on preventive care, including sealants and fluoride treatments, to keep your child\'s primary teeth healthy, as they serve as placeholders for their future adult smile.</p>
    `
  },
];

export const TESTIMONIALS = [
  { id: 1, text: "The team at Enamel Care is fantastic! I've always had anxiety about the dentist, but they made me feel completely at ease.", name: 'Jessica T.' },
  { id: 2, text: "State-of-the-art facility and incredibly professional staff. Highly recommend for any complex procedures.", name: 'Michael B.' },
  { id: 3, text: "Got my veneers done here and I couldn't be happier with the results! My smile looks natural and perfect.", name: 'Samantha P.' },
];
