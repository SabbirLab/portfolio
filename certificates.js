/*
  YOUR CERTIFICATE LIST. Edit only this file to update the Certificates section.

  HOW TO ADD ONE
  1. Put the certificate image (jpg, png, webp) or PDF inside  assets/certificates/
  2. Copy one block below, remove the // marks, and fill it in.
  3. Commit on GitHub. Wait 1 to 2 minutes. Done.

  FIELDS
  title    : name of the certificate                 (required)
  issuer   : who gave it                             (required)
  date     : "2025-07" or "2025"                     (used to sort, newest first)
  category : any word, like Competition, Course, Workshop, Academic
             Filter buttons are made from these words automatically.
  file     : file name inside assets/certificates/   (optional)
  link     : verification or credential URL          (optional)

  Keep the comma after every closing brace }.
*/
window.CERTIFICATES = [
  {
    title: "URC 2025 Participation Certificate",
    issuer: "The Mars Society",
    date: "June,2025",
    category: "Mars Rover",
    file: "urc_certificate.jpg",
    link: "https://www.marssociety.org/"
  },
  {
    title: "ARC 2025 Participation Certificate",
    issuer: "Space Exploration Society (UKET)",
    date: "July,2025",
    category: "Mars Rover",
    file: "arc_25.jpg",
    link: "https://www.anatolianrover.space/"
  },
  {
    title: "Red Hat System Administration I (RH124 - RHA) - Ver. 9.3",
    issuer: "Red Hat",
    date: "May,2025",
    category: "Red Hat Course",
    file: "redhat_1.jpg",
    link: "https://www.credly.com/badges/4afc87ed-b104-4d96-b11b-2a260a01ede3/linked_in_profile"
  },
  {
    title: "Red Hat System Administration II (RH134 - RHA) - Ver. 9.3",
    issuer: "Red Hat",
    date: "May,2025",
    category: "Red Hat Course",
    file: "redhat_9.3.jpg",
    link: "https://www.credly.com/badges/4b3d2750-67af-4cae-adee-d8adb74ef382/linked_in_profile"
  },
  {
    title: "Network Smarter with AI",
    issuer: "Grameenphone Academy",
    date: "April,2026",
    category: "GP Academy",
    file: "certificate-network-smarter-with-ai.jpg",
    link: "https://www.grameenphone.academy/cert/bb5d1174bd26"
  },
  {
    title: "AI-Powered Communication",
    issuer: "Grameenphone Academy",
    date: "May,2026",
    category: "GP Academy",
    file: "certificate-ai-powered-communication.jpg",
    link: "https://www.grameenphone.academy/cert/8acb2788c672"
  }
];
