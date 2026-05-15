import appointment_img from './appointment_img.png';
import header_imgs from './header_imgs.png';
import header_img1 from './header_img1.jpg';
import header_img2 from './header_img2.jpg';
import header_img from './header_img.avif';
import group_profiles from './group_profiles.png';
import profile_pic from './profile_pic.png';
import contact_image from './contact_image.png';
import about_image from './about_image.png';
import logo from './medicare_logo.png';

import dropdown_icon from './dropdown_icon.svg';
import menu_icon from './menu_icon.svg';
// import logo from './logo.svg'
import cross_icon from './cross_icon.png';
import chats_icon from './chats_icon.svg';
import verified_icon from './verified_icon.svg';
import arrow_icon from './arrow_icon.svg';
import info_icon from './info_icon.svg';
import upload_icon from './upload_icon.png';
import stripe_logo from './stripe_logo.png';
import razorpay_logo from './razorpay_logo.png';
import doc1 from './doc1.png';
import doc2 from './doc2.png';
import doc3 from './doc3.png';
import doc4 from './doc4.png';
import doc5 from './doc5.png';
import doc6 from './doc6.png';
import doc7 from './doc7.png';
import doc8 from './doc8.png';
import doc9 from './doc9.png';
import doc10 from './doc10.png';
import doc11 from './doc11.png';
import doc12 from './doc12.png';
import doc13 from './doc13.png';
import doc14 from './doc14.png';
import doc15 from './doc15.png';
import cust_1 from './cust_1.jpg';
import cust_2 from './cust_2.png';
import cust_3 from './cust_3.png';
import cust_4 from './cust_4.png';
import cust_5 from './cust_5.png';
import Dermatologist from './Dermatologist.svg';
import Gastroenterologist from './Gastroenterologist.svg';
import General_physician from './General_physician.svg';
import Gynecologist from './Gynecologist.svg';
import Neurologist from './Neurologist.svg';
import Pediatricians from './Pediatricians.svg';

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,

  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
  cust_1,
  cust_2,
  cust_3,
  cust_4,
  cust_5,
  header_imgs,
  header_img1,
  header_img2,
};

export const customer = [cust_1, cust_2, cust_3, cust_4, cust_5];

export const specialityData = [
  {
    speciality: 'General physician',
    image: General_physician,
  },
  {
    speciality: 'Gynecologist',
    image: Gynecologist,
  },
  {
    speciality: 'Dermatologist',
    image: Dermatologist,
  },
  {
    speciality: 'Pediatricians',
    image: Pediatricians,
  },
  {
    speciality: 'Neurologist',
    image: Neurologist,
  },
  {
    speciality: 'Gastroenterologist',
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Aarav Sharma',
    image: doc1,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '5 Years',
    isAvailable: true,
    about:
      'Dr. Aarav Sharma is known for providing compassionate and accurate medical care with a strong focus on preventive healthcare and early diagnosis. He emphasizes patient well-being through thorough consultations and personalized health plans. With 5 years of clinical experience, he manages a wide range of common illnesses and chronic conditions. Dr. Sharma believes in educating his patients about lifestyle changes to achieve long-term wellness. His approachable nature and detailed assessments make him a trusted choice for families.',
    fees: 500,
    address: {
      line1: '24, Connaught Place',
      line2: 'New Delhi, India',
    },
  },
  {
    _id: 'doc2',
    name: 'Dr. Priya Verma',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS, MD',
    experience: '7 Years',
    isAvailable: true,
    about:
      "Dr. Priya Verma specializes in women's healthcare and maternity care, offering personalized treatment with modern medical practices. She has extensive experience in managing high-risk pregnancies and complex gynecological conditions. Dr. Verma is particularly known for her patient-first approach and clear communication at every stage of care. She regularly conducts awareness sessions on women's health and reproductive wellness. Her empathetic consultations have made her a preferred choice for women across all age groups.",
    fees: 800,
    address: {
      line1: '18, Sector 62',
      line2: 'Noida, Uttar Pradesh',
    },
  },
  {
    _id: 'doc3',
    name: 'Dr. Rohan Mehta',
    image: doc3,
    speciality: 'Dermatologist',
    degree: 'MBBS, DDVL',
    experience: '4 Years',
    isAvailable: false,
    about:
      'Dr. Rohan Mehta provides advanced skin and hair treatments with a focus on healthy skincare and cosmetic dermatology. He is trained in the latest laser and aesthetic procedures for acne scars, pigmentation, and hair loss. His clinic follows a science-backed approach to skincare that goes beyond surface-level treatments. Dr. Mehta also counsels patients on daily skincare routines suited to Indian skin types and climates. He combines clinical precision with a keen aesthetic sense to deliver visible, lasting results.',
    fees: 700,
    address: {
      line1: '45, MG Road',
      line2: 'Bengaluru, Karnataka',
    },
  },
  {
    _id: 'doc4',
    name: 'Dr. Ananya Kapoor',
    image: doc4,
    speciality: 'Pediatrician',
    degree: 'MBBS, MD',
    experience: '6 Years',
    isAvailable: true,
    about:
      'Dr. Ananya Kapoor is dedicated to child healthcare, vaccinations, and growth monitoring with a caring and friendly approach. She manages a broad spectrum of pediatric conditions from newborn care to adolescent health. Dr. Kapoor places special emphasis on nutritional guidance and developmental milestones for young children. Parents particularly appreciate her calm demeanor and ability to make children feel safe and comfortable during visits. She also provides timely immunization schedules and follow-up care for growing kids.',
    fees: 600,
    address: {
      line1: '22, Civil Lines',
      line2: 'Jaipur, Rajasthan',
    },
  },
  {
    _id: 'doc5',
    name: 'Dr. Vivek Nair',
    image: doc5,
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '10 Years',
    isAvailable: false,
    about:
      "Dr. Vivek Nair specializes in neurological disorders and brain health with a decade of expertise in advanced neuro treatments. He has successfully managed complex cases including epilepsy, Parkinson's disease, and traumatic brain injuries. Dr. Nair is affiliated with leading neurology research centers and stays current with the latest clinical developments in the field. His systematic diagnostic approach helps patients receive accurate assessments and effective treatment plans. He is widely regarded for his calm, methodical, and highly professional approach to neurological care.",
    fees: 1200,
    address: {
      line1: '12, Marine Drive',
      line2: 'Mumbai, Maharashtra',
    },
  },
  {
    _id: 'doc6',
    name: 'Dr. Sneha Iyer',
    image: doc6,
    speciality: 'Cardiologist',
    degree: 'MBBS, DM Cardiology',
    experience: '9 Years',
    isAvailable: true,
    about:
      'Dr. Sneha Iyer focuses on heart care, hypertension management, and preventive cardiology for long-term wellness. She specializes in non-invasive cardiac diagnostics including echocardiography and stress testing. Dr. Iyer works closely with her patients to build personalized heart health plans that integrate medication, diet, and lifestyle changes. She is known for her clear explanations and her commitment to helping patients understand their cardiac health. With 9 years of practice, she has helped hundreds of patients manage and reverse lifestyle-driven heart conditions.',
    fees: 1500,
    address: {
      line1: '55, Anna Nagar',
      line2: 'Chennai, Tamil Nadu',
    },
  },
  {
    _id: 'doc7',
    name: 'Dr. Karan Malhotra',
    image: doc7,
    speciality: 'Orthopedic',
    degree: 'MBBS, MS',
    experience: '8 Years',
    isAvailable: true,
    about:
      'Dr. Karan Malhotra treats bone, joint, and sports injuries with modern orthopedic procedures and comprehensive rehabilitation support. He has expertise in arthroscopic surgeries, fracture management, and joint replacement procedures. Dr. Malhotra works closely with physiotherapists to ensure complete recovery and long-term mobility for his patients. He has treated athletes and working professionals alike, tailoring recovery plans to individual needs and lifestyles. His hands-on approach and precise surgical skills have earned him a strong reputation across North India.',
    fees: 900,
    address: {
      line1: '32, Sector 17',
      line2: 'Chandigarh, India',
    },
  },
  {
    _id: 'doc8',
    name: 'Dr. Neha Singh',
    image: doc8,
    speciality: 'Gynecologist',
    degree: 'MBBS, DGO',
    experience: '5 Years',
    isAvailable: true,
    about:
      "Dr. Neha Singh offers expert consultation in pregnancy care, fertility guidance, and women's wellness with a warm and supportive approach. She is experienced in managing both routine pregnancies and complex obstetric cases requiring close monitoring. Dr. Singh also provides counseling on PCOS, endometriosis, and menstrual health issues that affect women's daily lives. She believes in open conversations about reproductive health and ensures every patient feels heard and respected. Her compassionate care style has made her highly trusted among young women and new mothers.",
    fees: 850,
    address: {
      line1: '71, Gomti Nagar',
      line2: 'Lucknow, Uttar Pradesh',
    },
  },
  {
    _id: 'doc9',
    name: 'Dr. Arjun Reddy',
    image: doc9,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '3 Years',
    isAvailable: true,
    about:
      "Dr. Arjun Reddy is experienced in acne treatment, pigmentation care, and laser skin procedures for a wide range of dermatological concerns. He takes a personalized approach to each patient's skin type, designing treatment plans that deliver safe and effective results. Dr. Reddy stays updated with the latest advances in medical and cosmetic dermatology to offer cutting-edge care. He is particularly skilled in chemical peels, microneedling, and managing chronic skin conditions like eczema and psoriasis. His thorough consultations and follow-up care ensure patients see consistent improvement over time.",
    fees: 650,
    address: {
      line1: '14, Jubilee Hills',
      line2: 'Hyderabad, Telangana',
    },
  },
  {
    _id: 'doc10',
    name: 'Dr. Kavya Menon',
    image: doc10,
    speciality: 'Pediatrician',
    degree: 'MBBS, MD',
    experience: '4 Years',
    isAvailable: false,
    about:
      'Dr. Kavya Menon provides complete healthcare services for infants and children with a strong focus on nutrition and developmental progress. She closely monitors growth patterns and provides timely interventions for children showing signs of developmental delays. Dr. Menon is known for her gentle approach that puts even the most anxious children at ease during examinations. She also guides parents on feeding practices, sleep hygiene, and age-appropriate activities for healthy childhood development. Her thorough and caring consultations make her one of the most recommended pediatricians in Kolkata.',
    fees: 550,
    address: {
      line1: '29, Park Street',
      line2: 'Kolkata, West Bengal',
    },
  },
  {
    _id: 'doc11',
    name: 'Dr. Aditya Joshi',
    image: doc11,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '11 Years',
    isAvailable: true,
    about:
      'Dr. Aditya Joshi specializes in digestive disorders, liver care, and advanced gastrointestinal treatments with over a decade of clinical excellence. He is highly experienced in endoscopic procedures, colonoscopies, and the management of conditions like IBD, GERD, and hepatitis. Dr. Joshi takes a holistic approach that combines medical treatment with dietary and lifestyle modifications for sustained digestive health. He has published research on gastrointestinal health and is regularly invited to speak at medical conferences. His patients value his thorough diagnostic process and his ability to explain complex conditions in simple terms.',
    fees: 1400,
    address: {
      line1: '90, FC Road',
      line2: 'Pune, Maharashtra',
    },
  },
  {
    _id: 'doc12',
    name: 'Dr. Meera Bansal',
    image: doc12,
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '8 Years',
    isAvailable: true,
    about:
      'Dr. Meera Bansal provides comprehensive neurological care with expertise in migraines, epilepsy, and stroke management. She is skilled in performing and interpreting advanced neurodiagnostic tests including EEG, nerve conduction studies, and brain MRI evaluations. Dr. Bansal takes a compassionate, patient-centered approach, helping individuals and families navigate complex neurological diagnoses with clarity and confidence. She also conducts regular follow-ups to track treatment response and adjust care plans as needed. Her dedication to neurological wellness has made her one of the most sought-after neurologists in Delhi.',
    fees: 1300,
    address: {
      line1: '15, Rajouri Garden',
      line2: 'New Delhi, India',
    },
  },
  {
    _id: 'doc13',
    name: 'Dr. Rahul Deshmukh',
    image: doc13,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '6 Years',
    isAvailable: true,
    about:
      "Dr. Rahul Deshmukh focuses on family healthcare, preventive medicine, and the management of lifestyle-related illnesses such as diabetes, hypertension, and obesity. He offers comprehensive health check-ups and chronic disease management tailored to each patient's individual needs and circumstances. Dr. Deshmukh emphasizes early detection and proactive care to minimize the risk of serious health complications down the line. He builds long-term relationships with his patients, often serving as the first point of contact for all health concerns within a family. His affordable consultation fees and accessible clinic make him a go-to doctor for many households in Pune.",
    fees: 450,
    address: {
      line1: '44, Baner Road',
      line2: 'Pune, Maharashtra',
    },
  },
  {
    _id: 'doc14',
    name: 'Dr. Ishita Roy',
    image: doc14,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '5 Years',
    isAvailable: true,
    about:
      "Dr. Ishita Roy provides advanced gynecological care and consultation with a patient-friendly approach rooted in empathy and clinical expertise. She specializes in minimally invasive gynecological surgeries, prenatal care, and the management of hormonal disorders. Dr. Roy ensures that her patients are well-informed at every stage of diagnosis and treatment, encouraging them to take an active role in their healthcare journey. She also offers counseling on contraception, menopause management, and sexual health in a safe and non-judgmental environment. Her commitment to women's health across all life stages has earned her a loyal and growing patient base.",
    fees: 900,
    address: {
      line1: '88, Salt Lake',
      line2: 'Kolkata, West Bengal',
    },
  },
  {
    _id: 'doc15',
    name: 'Dr. Siddharth Chauhan',
    image: doc15,
    speciality: 'Dermatologist',
    degree: 'MBBS, DDVL',
    experience: '2 Years',
    isAvailable: true,
    about:
      "Dr. Siddharth Chauhan specializes in modern skincare treatments, acne solutions, and hair restoration therapy for patients seeking both medical and aesthetic dermatological care. Despite being early in his career, he brings a fresh, evidence-based perspective to common skin issues like hormonal acne, alopecia, and skin allergies. Dr. Chauhan is trained in advanced procedures including PRP therapy, dermal fillers, and chemical exfoliation treatments. He takes time to understand each patient's lifestyle and concerns before recommending a customized treatment plan. His approachable style and commitment to achieving natural-looking results have quickly built him a strong following.",
    fees: 600,
    address: {
      line1: '11, Bhopal Square',
      line2: 'Bhopal, Madhya Pradesh',
    },
  },
];
