import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a resume PDF to Firebase Storage.
 * Returns the public download URL.
 */
export const uploadResume = (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, "resume/portfolio_resume.pdf");
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: "application/pdf",
      contentDisposition: 'inline; filename="Resume.pdf"',
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};

/**
 * Delete the resume from Firebase Storage.
 */
export const deleteResume = async (): Promise<void> => {
  const storageRef = ref(storage, "resume/portfolio_resume.pdf");
  await deleteObject(storageRef);
};

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTIONS } from "./firestore";

/**
 * Get the public download URL of the current resume.
 * Checks Firestore for metadata (direct URL or Google Drive link).
 */
export const getResumeURL = async (): Promise<string | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.RESUME_META, "current");
    const snap = await getDoc(docRef);
    
    if (snap.exists()) {
      const data = snap.data();
      return data.url || data.driveURL || null;
    }

    // Fallback to default storage location if no metadata exists
    const storageRef = ref(storage, "resume/portfolio_resume.pdf");
    return await getDownloadURL(storageRef);
  } catch {
    return null;
  }
};
