import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

// Collection Names
export const COLLECTIONS = {
  PROJECTS: "projects",
  SKILLS: "skills",
  INQUIRIES: "inquiries",
  MEETINGS: "meetings",
  SCHEDULES: "schedules",
  ANALYTICS: "analytics",
  EXPERIENCE: "experience",
  RESUME_DOWNLOADS: "resume_downloads",
  RESUME_META: "resume_meta",
};

// Generic Fetch All
export const getAllDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Real-time Subscribe
export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, 
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
    },
    (error) => {
      // Fallback: query without ordering if index is missing
      console.warn(`subscribeToCollection fallback for "${collectionName}":`, error.message);
      const fallbackQ = query(collection(db, collectionName));
      onSnapshot(fallbackQ, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
      });
    }
  );
  return unsubscribe;
};

// Generic CRUD
export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date(),
  });
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  const docRef = doc(db, collectionName, id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: new Date(),
  });
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  return await deleteDoc(docRef);
};

// Projects
export const addProject = async (projectData: any) => {
  return await addDocument(COLLECTIONS.PROJECTS, projectData);
};

// Skills
export const addSkill = async (skillData: any) => {
  return await addDocument(COLLECTIONS.SKILLS, skillData);
};

// Contact Form
export const submitInquiry = async (inquiryData: any) => {
  return await addDocument(COLLECTIONS.INQUIRIES, inquiryData);
};

// Resume Download Tracking
export const trackResumeDownload = async (downloaderInfo: { userAgent?: string; referrer?: string }) => {
  return await addDocument(COLLECTIONS.RESUME_DOWNLOADS, {
    ...downloaderInfo,
    downloadedAt: new Date(),
  });
};
