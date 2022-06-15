import React, { SetStateAction } from "react";
import { IProject } from "types";

const DB_NAME = "knit-tracker";
const DB_VERSION = 1;
const DB_STORE_NAME = "projects";

export class Database {
  db: IDBDatabase | null = null;

  openDatabase(setInitialized: React.Dispatch<SetStateAction<boolean>>) {
    const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = (evt) => {
      this.db = (evt.target as IDBOpenDBRequest).result;

      setInitialized(true);

      // A generic error handler
      this.db.onerror = (evt) => {
        console.error(`Database error: ${(evt.target as any).errorCode}`);
      };
    };

    request.onerror = () => console.error("Data cannot be stored at this time");

    request.onupgradeneeded = (evt) => {
      const objectStore = (evt.target as any).result.createObjectStore(
        DB_STORE_NAME,
        {
          keyPath: "slug",
          autoIncrement: true,
        }
      );

      if (objectStore) {
        objectStore.createIndex("slug", "slug", { unique: true });
        objectStore.createIndex("name", "name", { unique: false });
      }
    };
  }

  getObjectStore(mode: IDBTransactionMode = "readonly") {
    return this.db?.transaction(DB_STORE_NAME, mode).objectStore(DB_STORE_NAME);
  }

  getProject(
    slug: string,
    setProject: React.Dispatch<SetStateAction<IProject | null>>
  ) {
    const objectStore = this.getObjectStore();

    if (objectStore) {
      objectStore.get(slug).onsuccess = (evt) => {
        setProject((evt.target as any).result);
      };
    }
  }

  getAllProjects(
    setProjects: React.Dispatch<SetStateAction<IProject[] | null>>,
    onRedirect: (projectsLength?: number) => void
  ) {
    const objectStore = this.getObjectStore();

    if (objectStore) {
      objectStore.getAll().onsuccess = (evt) => {
        setProjects((evt.target as any).result);
        onRedirect((evt.target as any).result.length);
      };
    }
  }

  postProject(project: IProject) {
    const objectStore = this.getObjectStore("readwrite");

    if (objectStore) {
      objectStore.add(project);
    }
  }

  updateProject(
    project: IProject,
    setProject: React.Dispatch<SetStateAction<IProject | null>>
  ) {
    const objectStore = this.getObjectStore("readwrite");

    if (objectStore) {
      objectStore.put(project).onsuccess = () => {
        this.getProject(project.slug, setProject);
      };
    }
  }
}

export const database = new Database();
