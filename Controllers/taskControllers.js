import firebase from "../firebase.js";
import Task from "../Models/task.js";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const createTask = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, "tasks"), data);
        res.status(200).send("task created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await getDocs(collection(db, "tasks"));
        const taskArray = [];

        if (tasks.empty) {
            res.status(400).send("No Tasks found");
        } else {
            tasks.forEach((doc) => {
                const task = new Task(
                    doc.id,
                    doc.data().fid,
                    doc.data().displayName,
                    doc.data().pfpUrl,
                    doc.data().title,
                    doc.data().description,
                    doc.data().price,
                    doc.data().verifiedAddresses,
                    doc.data().applicants,
                    doc.data().status,
                    doc.data().dealWith
                );
                taskArray.push(task);
            });

            res.status(200).send(taskArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = doc(db, "tasks", id);
        const data = await getDoc(task);
        if (data.exists()) {
            res.status(200).send(data.data());
        } else {
            res.status(404).send("task not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const task = doc(db, "tasks", id);
        await updateDoc(task, data);
        res.status(200).send("task updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const addApplicants = async (req, res, next) => {
    try {
        const id = req.params.id;
        const newApplicant = req.body; // Assuming the request body contains the new applicant data

        // console.log(newApplicant);

        // Get the existing task document
        const taskRef = doc(db, "tasks", id);
        const taskSnap = await getDoc(taskRef);

        if (taskSnap.exists()) {
            // Get the existing applicants data
            const existingData = taskSnap.data().applicants || {};
            
            existingData.push(newApplicant);

            // Update the task document with the updated applicants object
            await updateDoc(taskRef, { applicants: existingData});

            res.status(200).send("New applicant added successfully");
        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const makeDeal = async (req, res, next) => {
    try {
        const id = req.params.id;
        const dataToUpdate = req.body;

        const taskRef = doc(db, "tasks", id);
        const taskSnap = await getDoc(taskRef);

        if (taskSnap.exists()) {
            // Merge existing data with the updated data
            const existingData = taskSnap.data();
            const updatedData = { ...existingData, ...dataToUpdate };

            // Update the task document with the updated data
            await updateDoc(taskRef, updatedData);

            res.status(200).send("Task partially updated successfully");
        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, "tasks", id));
        res.status(200).send("task deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};
