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
    date: "2025",
    category: "Mars Rover",
    file: "urc_certificate.jpg",
    link: "https://www.marssociety.org/"
  },
];
