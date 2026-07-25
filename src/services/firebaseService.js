import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

const getUserRef = (uid) => doc(db, "users", uid);

export const loadUserData = async (uid) => {
  try {
    const ref = getUserRef(uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        cart: [],
      });

      return [];
    }

    const cart = snap.data().cart || [];

    // remove duplicates + invalid values
    const cleanedCart = [
      ...new Set(
        cart.filter((id) => typeof id === "number" && !Number.isNaN(id)),
      ),
    ];

    // update firestore if data changed
    if (cleanedCart.length !== cart.length) {
      await updateDoc(ref, {
        cart: cleanedCart,
      });
    }

    return cleanedCart;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const syncMovies = async (movies, uid) => {
  if (!uid) return movies;

  try {
    const cart = await loadUserData(uid);

    return movies.map((movie) => ({
      ...movie,
      isInCart: cart.includes(movie.id),
    }));
  } catch (err) {
    console.error(err);
    return movies;
  }
};

export const updateCart = async (uid, movieId, isAdding) => {
  const ref = getUserRef(uid);

  await updateDoc(ref, {
    cart: isAdding ? arrayUnion(movieId) : arrayRemove(movieId),
  });

  return await loadUserData(uid);
};
