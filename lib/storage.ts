
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTIONS } from "./firestore";

/**
 * Get the public download URL of the current resume.
 * Checks Firestore for metadata (ImageKit URL or Google Drive link).
 */
export const getResumeURL = async (): Promise<string | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.RESUME_META, "current");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      if (data.activeSource === "drive" && data.driveURL) return data.driveURL;
      if (data.activeSource === "imagekit" && data.url) return data.url;
      // Fallback if activeSource is not set or the active source is empty
      return data.url || data.driveURL || null;
    }

    return null;
  } catch {
    return null;
  }
};
