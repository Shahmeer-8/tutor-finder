/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          TutorFinder — Demo Data Seed Script                ║
 * ║  Creates: Users, Tutors, Students, Requests, Reviews,       ║
 * ║           Courses — perfect for demo / portfolio showcase   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * USAGE:
 *   node seed.mjs
 *   # OR with URI directly:
 *   MONGODB_URI=mongodb+srv://... node seed.mjs
 *
 * Place this file inside:  TutorFinder/backend/
 * Then run from that folder.
 *
 * All demo accounts use password:  Demo@1234
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

// Load .env from backend folder
config();

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tutorfinder";
const DEMO_PASSWORD = "Demo@1234";
const SALT_ROUNDS = 10;

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickN = (arr, n) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, Math.min(n, arr.length));
const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Random date between (now - maxMonthsAgo) and (now - minMonthsAgo) */
function randDate(maxMonthsAgo, minMonthsAgo = 0) {
  const now = Date.now();
  const minMs = minMonthsAgo * 30 * 24 * 60 * 60 * 1000;
  const maxMs = maxMonthsAgo * 30 * 24 * 60 * 60 * 1000;
  return new Date(now - randInt(minMs, maxMs));
}

// ─── REFERENCE DATA ──────────────────────────────────────────────────────────
const CITIES = [
  "Lahore", "Karachi", "Islamabad", "Faisalabad",
  "Rawalpindi", "Multan", "Peshawar", "Gujranwala",
];

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Urdu", "Computer Science", "Statistics",
  "Economics", "Accounting",
];

const LEVELS = [
  "Primary", "Middle", "Matric", "Intermediate",
  "O-Level", "A-Level", "Undergraduate",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const QUALIFICATIONS = [
  "BS Mathematics", "MS Physics", "BS Computer Science",
  "BS Chemistry", "M.Phil Mathematics", "BS Biology",
  "MBA", "BS English Literature",
];

const INSTITUTIONS = [
  "University of Lahore", "Punjab University", "FAST NUCES",
  "LUMS", "COMSATS University", "UET Lahore",
  "GCU Lahore", "Bahria University",
];

const CLASS_LEVELS = [
  "Grade 6", "Grade 8", "Grade 9 (Matric)",
  "Grade 10 (Matric)", "Grade 11 (FSc Part-1)",
  "Grade 12 (FSc Part-2)", "Undergraduate Year 1",
];

const BIOS = [
  "Experienced teacher with 5+ years in academics. I specialise in making complex topics easy to understand through real-world examples.",
  "Passionate educator committed to student success. I use modern teaching methods to engage students and build confidence.",
  "Masters degree holder with experience in both school and college level teaching. Very friendly, patient, and result-oriented.",
  "I believe every student can excel with the right guidance. My goal is to build strong fundamentals that last a lifetime.",
  "Former school teacher now offering private tuition. Proven track record of improving student grades by 20–40%.",
  "Dedicated tutor with expertise in multiple subjects. I tailor my teaching style to match each student's learning pace.",
  "5 years of teaching experience at academy level. I focus on conceptual understanding rather than rote learning.",
];

const REVIEW_COMMENTS = [
  "Bahut acha padhata hai, mera beta ka result dramatically improve hua!",
  "Excellent teacher, very patient and knowledgeable. Highly recommended.",
  "Meri beti Mathematics mein A+ lai. Shukriya itni mehnat ke liye!",
  "Very professional and always punctual. My child looks forward to every session.",
  "Best tutor I have found for Physics. Explains even the hardest concepts clearly.",
  "Affordable rates, great quality teaching, and genuinely cares about students.",
  "Always comes on time and explains concepts in a very engaging way.",
  "My child improved from 60% to 85% in just 3 months of tutoring. Amazing!",
  "Great overall experience. Would definitely hire again next semester.",
  "Very dedicated and passionate about teaching. 10/10 would recommend.",
  "My son finally understands calculus thanks to this tutor. Life-changing!",
  "Structured lessons, regular feedback, and very responsive. Top-notch.",
];

const REQUEST_MESSAGES = [
  "Mujhe Mathematics mein help chahiye, especially calculus aur algebra.",
  "My child is struggling with Physics numericals. Need urgent help.",
  "Looking for a patient tutor for O-Level Chemistry preparation.",
  "Need help with English essay writing and grammar for Matric.",
  "Preparing for A-Level exams, need expert guidance for the next 3 months.",
  "Mera beta Grade 9 mein hai, use Math aur Science dono mein tuition chahiye.",
  "Looking for an online tutor for Computer Science — Python and databases.",
  "Need a home tutor for FSc Biology, preferably female tutor.",
  "Seeking guidance for Economics and Accounting for Intermediate.",
  "My daughter needs help with Urdu language and literature.",
];

// ─── SCHEMAS (inline — no TypeScript needed) ─────────────────────────────────

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ["student", "tutor", "admin"] },
    phone: String,
    city: String,
    cnic: String,
    avatarUrl: String,
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    refreshTokens: { type: Array, default: [] },
  },
  { timestamps: true }
);

const AvailabilitySlotSchema = new mongoose.Schema(
  { day: String, startTime: String, endTime: String },
  { _id: false }
);

const TutorDocSchema = new mongoose.Schema(
  {
    docType: { type: String, enum: ["cnic_front", "cnic_back", "degree", "experience_letter"] },
    url: String,
    publicId: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const TutorProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    bio: String,
    subjects: [String],
    levels: [String],
    tutoringType: { type: String, enum: ["online", "home", "both"], default: "online" },
    teachingModes: { type: [String], enum: ["online", "home"], default: ["online"] },
    availability: {
      online: { type: [AvailabilitySlotSchema], default: [] },
      home: { type: [AvailabilitySlotSchema], default: [] },
    },
    homeTuitionCities: [String],
    hourlyRate: Number,
    experience: Number,
    qualification: String,
    documents: { type: [TutorDocSchema], default: [] },
    verificationStatus: {
      type: String,
      enum: ["unverified", "documents_submitted", "interview_scheduled", "approved", "rejected", "reapplication"],
      default: "unverified",
    },
    verificationNotes: String,
    rejectedAt: Date,
    interviewLink: String,
    interviewDate: Date,
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const StudentDocSchema = new mongoose.Schema(
  {
    docType: { type: String, enum: ["cnic_front", "cnic_back", "domicile", "student_card"] },
    url: String,
    publicId: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const StudentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    classLevel: String,
    institution: String,
    documents: { type: [StudentDocSchema], default: [] },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["unverified", "pending_review", "approved", "rejected", "reapplication"],
      default: "unverified",
    },
    verificationNotes: String,
    rejectedAt: Date,
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TutorRequestSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    studentName: String,
    tutorName: String,
    tutorAvatarUrl: String,
    subject: String,
    level: String,
    mode: { type: String, enum: ["online", "home"] },
    selectedSlot: {
      day: String,
      startTime: String,
      endTime: String,
    },
    meetingLink: String,
    homeAddress: { city: String, fullAddress: String },
    message: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "trial", "completed"],
      default: "pending",
    },
    fee: Number,
    scheduledAt: Date,
    trialStartedAt: Date,
    trialExpiresAt: Date,
  },
  { timestamps: true }
);

const ReviewSchema = new mongoose.Schema(
  {
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "TutorRequest", unique: true },
    studentName: String,
    studentAvatar: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

const CourseSlotSchema = new mongoose.Schema(
  { day: String, startTime: String, endTime: String },
  { _id: false }
);

const CourseSchema = new mongoose.Schema(
  {
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    subject: String,
    level: String,
    description: String,
    fee: Number,
    mode: { type: String, enum: ["online", "home", "both"] },
    duration: String,
    availability: {
      online: { type: [CourseSlotSchema], default: [] },
      home: { type: [CourseSlotSchema], default: [] },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── MODELS ──────────────────────────────────────────────────────────────────
const User = mongoose.model("User", UserSchema);
const TutorProfile = mongoose.model("TutorProfile", TutorProfileSchema);
const StudentProfile = mongoose.model("StudentProfile", StudentProfileSchema);
const TutorRequest = mongoose.model("TutorRequest", TutorRequestSchema);
const Review = mongoose.model("Review", ReviewSchema);
const Course = mongoose.model("Course", CourseSchema);

// ─── SEED DATA ───────────────────────────────────────────────────────────────

const TUTOR_SEED = [
  { name: "Ahmad Raza",      email: "ahmad.raza@demo.com"      },
  { name: "Fatima Khan",     email: "fatima.khan@demo.com"     },
  { name: "Muhammad Usman",  email: "m.usman@demo.com"         },
  { name: "Ayesha Siddiqui", email: "ayesha.sid@demo.com"      },
  { name: "Hassan Ali",      email: "hassan.ali@demo.com"      },
  { name: "Zainab Malik",    email: "zainab.malik@demo.com"    },
  { name: "Bilal Ahmed",     email: "bilal.ahmed@demo.com"     },
  { name: "Sana Iqbal",      email: "sana.iqbal@demo.com"      },
  { name: "Omar Farooq",     email: "omar.farooq@demo.com"     },
  { name: "Hina Baig",       email: "hina.baig@demo.com"       },
  { name: "Kamran Sheikh",   email: "kamran.sheikh@demo.com"   },
  { name: "Nadia Hussain",   email: "nadia.hussain@demo.com"   },
  { name: "Tariq Mehmood",   email: "tariq.mehmood@demo.com"   },
  { name: "Rabia Qureshi",   email: "rabia.qureshi@demo.com"   },
  { name: "Imran Butt",      email: "imran.butt@demo.com"      },
];

const STUDENT_SEED = [
  { name: "Ali Hassan",      email: "ali.hassan.s@demo.com"    },
  { name: "Sara Ahmed",      email: "sara.ahmed.s@demo.com"    },
  { name: "Umar Qasim",      email: "umar.qasim@demo.com"      },
  { name: "Maryam Zia",      email: "maryam.zia@demo.com"      },
  { name: "Hamza Tariq",     email: "hamza.tariq@demo.com"     },
  { name: "Amna Yousaf",     email: "amna.yousaf@demo.com"     },
  { name: "Zaid Rehman",     email: "zaid.rehman@demo.com"     },
  { name: "Iqra Naeem",      email: "iqra.naeem@demo.com"      },
  { name: "Asad Nisar",      email: "asad.nisar@demo.com"      },
  { name: "Saima Waheed",    email: "saima.waheed@demo.com"    },
  { name: "Faisal Jamil",    email: "faisal.jamil@demo.com"    },
  { name: "Noor Fatima",     email: "noor.fatima@demo.com"     },
  { name: "Waqas Anwar",     email: "waqas.anwar@demo.com"     },
  { name: "Hira Shahid",     email: "hira.shahid@demo.com"     },
  { name: "Danish Raza",     email: "danish.raza@demo.com"     },
];

// Fake document URLs (Cloudinary-style placeholders)
function fakeDocs(docTypes) {
  return docTypes.map((docType, i) => ({
    docType,
    url: `https://res.cloudinary.com/demo/image/upload/v1/tutorfinder/docs/${docType}_${i}.jpg`,
    publicId: `tutorfinder/docs/${docType}_${i}`,
    uploadedAt: new Date(),
  }));
}

// Random availability slots for a tutor
function makeSlots(count = 3) {
  const days = pickN(DAYS, count);
  return days.map((day) => {
    const startHour = randInt(8, 18);
    return {
      day,
      startTime: `${String(startHour).padStart(2, "0")}:00`,
      endTime: `${String(startHour + 2).padStart(2, "0")}:00`,
    };
  });
}

// ─── MAIN SEED FUNCTION ──────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  TutorFinder Seed Script Starting...");
  console.log(`📡  Connecting to: ${MONGO_URI.replace(/:[^:@]+@/, ":****@")}\n`);

  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  console.log("✅  MongoDB connected.\n");

  // ── 1. CLEAR OLD DEMO DATA ──────────────────────────────────────────────
  console.log("🗑️   Clearing old demo data...");
  const demoEmails = [
    ...TUTOR_SEED.map((t) => t.email),
    ...STUDENT_SEED.map((s) => s.email),
    "admin@tutorfinder.pk",
  ];
  const oldUsers = await User.find({ email: { $in: demoEmails } }).select("_id");
  const oldIds = oldUsers.map((u) => u._id);

  await Promise.all([
    User.deleteMany({ email: { $in: demoEmails } }),
    TutorProfile.deleteMany({ userId: { $in: oldIds } }),
    StudentProfile.deleteMany({ userId: { $in: oldIds } }),
    TutorRequest.deleteMany({ $or: [{ studentId: { $in: oldIds } }, { tutorId: { $in: oldIds } }] }),
    Review.deleteMany({ $or: [{ studentId: { $in: oldIds } }, { tutorId: { $in: oldIds } }] }),
    Course.deleteMany({ tutorId: { $in: oldIds } }),
  ]);
  console.log("✅  Old demo data cleared.\n");

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, SALT_ROUNDS);

  // ── 2. CREATE ADMIN ──────────────────────────────────────────────────────
  console.log("👤  Creating admin user...");
  const admin = await User.create({
    name: "Admin TutorFinder",
    email: "admin@tutorfinder.pk",
    passwordHash,
    role: "admin",
    phone: "+923001234567",
    city: "Lahore",
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
  });
  console.log(`   ✅ Admin: ${admin.email}`);

  // ── 3. CREATE TUTORS ─────────────────────────────────────────────────────
  console.log("\n👨‍🏫  Creating tutors...");
  const tutorUsers = [];
  const tutorProfiles = [];

  for (let i = 0; i < TUTOR_SEED.length; i++) {
    const { name, email } = TUTOR_SEED[i];

    // Verification status distribution:
    // 0–11 → approved, 12 → pending docs, 13 → interview scheduled, 14 → rejected
    let verificationStatus = "approved";
    if (i === 12) verificationStatus = "documents_submitted";
    else if (i === 13) verificationStatus = "interview_scheduled";
    else if (i === 14) verificationStatus = "rejected";

    const subjects = pickN(SUBJECTS, randInt(2, 4));
    const levels   = pickN(LEVELS, randInt(2, 4));
    const city     = CITIES[i % CITIES.length];
    const rate     = randInt(5, 30) * 100; // 500–3000 PKR
    const exp      = randInt(1, 10);
    const tutoringType = pick(["online", "home", "both"]);
    const avgRating = verificationStatus === "approved"
      ? parseFloat((Math.random() * 1.5 + 3.5).toFixed(1))
      : 0;
    const totalReviews = verificationStatus === "approved"
      ? randInt(3, 20)
      : 0;

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "tutor",
      phone: `+9230${randInt(10000000, 99999999)}`,
      city,
      cnic: `${randInt(10000, 99999)}-${randInt(1000000, 9999999)}-${randInt(1, 9)}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      isEmailVerified: true,
      isPhoneVerified: verificationStatus === "approved",
      isActive: true,
      createdAt: randDate(6, 1),
    });

    const docs = fakeDocs(["cnic_front", "cnic_back", "degree"]);
    if (exp > 2) docs.push(...fakeDocs(["experience_letter"]));

    const profile = await TutorProfile.create({
      userId: user._id,
      bio: pick(BIOS),
      subjects,
      levels,
      tutoringType,
      teachingModes: tutoringType === "both"
        ? ["online", "home"]
        : tutoringType === "online"
        ? ["online"]
        : ["home"],
      availability: {
        online: tutoringType !== "home" ? makeSlots(3) : [],
        home:   tutoringType !== "online" ? makeSlots(2) : [],
      },
      homeTuitionCities: tutoringType !== "online" ? pickN(CITIES, 2) : [],
      hourlyRate: rate,
      experience: exp,
      qualification: pick(QUALIFICATIONS),
      documents: docs,
      verificationStatus,
      verificationNotes:
        verificationStatus === "rejected"
          ? "Documents were unclear. Please resubmit with better quality images."
          : verificationStatus === "interview_scheduled"
          ? "Scheduled for verification interview."
          : undefined,
      interviewLink:
        verificationStatus === "interview_scheduled"
          ? "https://meet.google.com/demo-link"
          : undefined,
      interviewDate:
        verificationStatus === "interview_scheduled"
          ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          : undefined,
      averageRating: avgRating,
      totalReviews,
      isProfileComplete: verificationStatus !== "rejected",
    });

    tutorUsers.push(user);
    tutorProfiles.push(profile);
    process.stdout.write(`   ✅ ${name} (${verificationStatus})\n`);
  }

  // ── 4. CREATE STUDENTS ───────────────────────────────────────────────────
  console.log("\n🎓  Creating students...");
  const studentUsers = [];

  for (let i = 0; i < STUDENT_SEED.length; i++) {
    const { name, email } = STUDENT_SEED[i];

    let verificationStatus = "approved";
    if (i === 12) verificationStatus = "pending_review";
    else if (i === 13) verificationStatus = "pending_review";
    else if (i === 14) verificationStatus = "unverified";

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "student",
      phone: `+9233${randInt(10000000, 99999999)}`,
      city: CITIES[i % CITIES.length],
      cnic: `${randInt(10000, 99999)}-${randInt(1000000, 9999999)}-${randInt(1, 9)}`,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&style=circle`,
      isEmailVerified: true,
      isPhoneVerified: verificationStatus === "approved",
      isActive: true,
      createdAt: randDate(5, 0),
    });

    const docs = fakeDocs(["cnic_front", "cnic_back", "student_card"]);

    await StudentProfile.create({
      userId: user._id,
      classLevel: pick(CLASS_LEVELS),
      institution: pick(INSTITUTIONS),
      documents: verificationStatus !== "unverified" ? docs : [],
      isEmailVerified: true,
      isPhoneVerified: verificationStatus === "approved",
      verificationStatus,
      isProfileComplete: verificationStatus === "approved",
    });

    studentUsers.push(user);
    process.stdout.write(`   ✅ ${name} (${verificationStatus})\n`);
  }

  // ── 5. CREATE COURSES ────────────────────────────────────────────────────
  console.log("\n📚  Creating courses...");
  const COURSE_TEMPLATES = [
    { titleFn: (s, l) => `${s} Complete Course — ${l}`,   desc: "Comprehensive course covering all topics from basics to advanced level. Weekly tests included." },
    { titleFn: (s)    => `${s} Crash Course`,              desc: "Intensive crash course ideal for exam preparation. Focus on high-yield topics and past paper practice." },
    { titleFn: (s, l) => `${s} Fundamentals (${l})`,       desc: "Build a strong foundation in this subject. Ideal for students who want to improve their basics." },
  ];

  const allCourses = [];
  const approvedTutors = tutorUsers.filter((_, i) => i <= 11);

  for (const tutor of approvedTutors) {
    const profile = tutorProfiles[tutorUsers.indexOf(tutor)];
    const numCourses = randInt(2, 3);
    const tutorSubjects = profile.subjects.slice(0, numCourses);

    for (const subject of tutorSubjects) {
      const level  = pick(profile.levels);
      const tmpl   = pick(COURSE_TEMPLATES);
      const mode   = profile.tutoringType;
      const fee    = profile.hourlyRate * randInt(10, 20); // monthly fee

      const course = await Course.create({
        tutorId: tutor._id,
        title: tmpl.titleFn(subject, level),
        subject,
        level,
        description: tmpl.desc,
        fee,
        mode,
        duration: pick(["1 hour / day", "1.5 hours / day", "2 hours / day"]),
        availability: {
          online: mode !== "home" ? makeSlots(3) : [],
          home:   mode !== "online" ? makeSlots(2) : [],
        },
        isActive: true,
      });
      allCourses.push(course);
    }
  }
  console.log(`   ✅ ${allCourses.length} courses created.`);

  // ── 6. CREATE TUTOR REQUESTS ─────────────────────────────────────────────
  console.log("\n📩  Creating tutor requests...");

  /**
   * Status distribution across 6 months:
   *   completed  → 35  (for revenue charts)
   *   approved   → 12
   *   trial      → 8
   *   pending    → 8
   *   rejected   → 7
   *   Total      → 70
   */
  const REQUEST_PLAN = [
    ...Array(35).fill("completed"),
    ...Array(12).fill("approved"),
    ...Array(8).fill("trial"),
    ...Array(8).fill("pending"),
    ...Array(7).fill("rejected"),
  ];

  const allRequests = [];

  for (let i = 0; i < REQUEST_PLAN.length; i++) {
    const status   = REQUEST_PLAN[i];
    const tutor    = approvedTutors[i % approvedTutors.length];
    const student  = studentUsers[i % studentUsers.length];
    const profile  = tutorProfiles[tutorUsers.indexOf(tutor)];
    const subject  = pick(profile.subjects);
    const level    = pick(profile.levels);
    const mode     = profile.tutoringType === "both"
      ? pick(["online", "home"])
      : profile.tutoringType === "both"
      ? "home"
      : profile.tutoringType;
    const fee      = profile.hourlyRate;
    const slot     = pick(profile.availability.online.length
      ? profile.availability.online
      : profile.availability.home);

    // Spread over last 6 months
    const monthAgo = Math.floor(i / 12); // 0–5 months ago
    const createdAt = randDate(monthAgo + 1, monthAgo);

    const trialStarted = status === "trial" || status === "completed"
      ? new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000)
      : undefined;
    const trialExpires = trialStarted
      ? new Date(trialStarted.getTime() + 3 * 24 * 60 * 60 * 1000)
      : undefined;

    const request = await TutorRequest.create({
      studentId: student._id,
      tutorId: tutor._id,
      studentName: student.name,
      tutorName: tutor.name,
      tutorAvatarUrl: tutor.avatarUrl,
      subject,
      level,
      mode,
      selectedSlot: slot || undefined,
      meetingLink: mode === "online" ? "https://meet.google.com/demo-session" : undefined,
      homeAddress: mode === "home"
        ? { city: student.city, fullAddress: `${randInt(1, 500)} Demo Street, ${student.city}` }
        : undefined,
      message: pick(REQUEST_MESSAGES),
      status,
      fee,
      scheduledAt: status !== "pending" ? new Date(createdAt.getTime() + 24 * 60 * 60 * 1000) : undefined,
      trialStartedAt: trialStarted,
      trialExpiresAt: trialExpires,
      createdAt,
      updatedAt: createdAt,
    });

    allRequests.push(request);
  }
  console.log(`   ✅ ${allRequests.length} tutor requests created.`);

  // ── 7. CREATE REVIEWS ────────────────────────────────────────────────────
  console.log("\n⭐  Creating reviews...");
  const completedRequests = allRequests.filter((r) => r.status === "completed");
  const reviewsCreated = [];

  for (const req of completedRequests) {
    const tutor   = tutorUsers.find((u) => u._id.equals(req.tutorId));
    const student = studentUsers.find((u) => u._id.equals(req.studentId));
    if (!tutor || !student) continue;

    const rating = randInt(3, 5);
    const review = await Review.create({
      tutorId: tutor._id,
      studentId: student._id,
      requestId: req._id,
      studentName: student.name,
      studentAvatar: student.avatarUrl,
      rating,
      comment: pick(REVIEW_COMMENTS),
      createdAt: new Date(req.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000),
    });
    reviewsCreated.push(review);
  }

  // Update tutor average ratings
  for (const tutorUser of approvedTutors) {
    const tutorReviews = reviewsCreated.filter((r) => r.tutorId.equals(tutorUser._id));
    if (tutorReviews.length === 0) continue;
    const avg = tutorReviews.reduce((sum, r) => sum + r.rating, 0) / tutorReviews.length;
    await TutorProfile.updateOne(
      { userId: tutorUser._id },
      { averageRating: parseFloat(avg.toFixed(1)), totalReviews: tutorReviews.length }
    );
  }
  console.log(`   ✅ ${reviewsCreated.length} reviews created.`);

  // ── 8. PRINT SUMMARY ─────────────────────────────────────────────────────
  const totalRevenue = allRequests
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.fee * 0.1, 0);

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║               ✅  SEED COMPLETED SUCCESSFULLY               ║
╠══════════════════════════════════════════════════════════════╣
║  👑 Admin          : 1                                       ║
║  👨‍🏫 Tutors         : ${TUTOR_SEED.length} (12 approved, 1 pending, 1 interview, 1 rejected)
║  🎓 Students       : ${STUDENT_SEED.length} (13 approved, 2 pending)              ║
║  📚 Courses        : ${allCourses.length}                                      ║
║  📩 Requests       : ${allRequests.length} (35 completed, 12 approved, 8 trial, ║
║                       8 pending, 7 rejected)                 ║
║  ⭐ Reviews        : ${reviewsCreated.length}                                      ║
║  💰 Platform Rev.  : ~PKR ${Math.round(totalRevenue).toLocaleString()} (10% commission)     ║
╠══════════════════════════════════════════════════════════════╣
║  🔑 All passwords  : Demo@1234                              ║
║  👑 Admin login    : admin@tutorfinder.pk / Demo@1234       ║
║  👨‍🏫 Tutor login    : ahmad.raza@demo.com / Demo@1234        ║
║  🎓 Student login  : ali.hassan.s@demo.com / Demo@1234      ║
╚══════════════════════════════════════════════════════════════╝
`);

  await mongoose.disconnect();
  process.exit(0);
}

// ─── RUN ─────────────────────────────────────────────────────────────────────
seed().catch((err) => {
  console.error("\n❌  Seed failed:", err.message);
  process.exit(1);
});
