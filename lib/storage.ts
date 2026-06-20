import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTIONS } from "./firestore";

/**
 * Get the public download URL of the current resume.
 * Respects the activeSource field from Firestore metadata.
 * Returns the ImageKit URL or Google Drive URL depending on active source.
 */
export const getResumeURL = async (): Promise<string | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.RESUME_META, "current");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      const active = data.activeSource;

      if (active === "imagekit" && data.url) return data.url;
      if (active === "drive" && data.driveURL) return data.driveURL;

      // Fallback: return whichever source has data
      return data.url || data.driveURL || null;
    }

    return null;
  } catch {
    return null;
  }
};
