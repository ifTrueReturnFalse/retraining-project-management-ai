# Projet OC – Plateforme de Gestion de Projet / Project Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
[![Mistral AI](https://img.shields.io/badge/Mistral%20AI-FA520F?logo=mistral-ai&logoColor=fff)](#)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](#)

![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-blue)

---

## 🇫🇷 Version française

Ceci est le dépôt GitHub d’une application full-stack de **gestion de projet et de tâches**, dans le cadre de ma formation avec OpenClassrooms.

L’objectif principal est de développer une **plateforme web collaborative** permettant aux utilisateurs de créer, d'assigner et de suivre l'avancement de leurs tâches de manière intuitive. L'application est conçue pour être robuste, sécurisée et offrir une expérience utilisateur fluide.

Le projet a été réalisé avec **Next.js (App Router)** et **TypeScript**, en mettant l'accent sur la fiabilité des données (grâce à Zod) et la gestion d'état globale.

### Fonctionnalités Clés

- **Gestion des Tâches** : Création et suivi des tâches avec des statuts (À faire, En cours, Terminé), des priorités et des dates d'échéance.
- **Collaboration** : Assignation de tâches à plusieurs membres de l'équipe et système de commentaires intégrés.
- **Espace Compte Utilisateur** : Interface dédiée pour mettre à jour les informations de profil (nom, email) et modifier son mot de passe de façon sécurisée.
- **Validation Stricte** : Formulaires entièrement validés côté client et côté serveur pour prévenir les erreurs.
- **Notifications** : Retours visuels interactifs (toasts) lors de la mise à jour des données.
- **Génération de tâches par IA** : Utilisation des données du projet pour créer des tâches en rapport avec la demande de l'utisateur.

## Technologies utilisées

| Pile Technique | Outil | Rôle |
|:---|:---|:---|
| Langage | TypeScript | Typage statique pour un code plus robuste et maintenable |
| Framework Frontend | Next.js / React | Construction de l'interface utilisateur et rendu hybride |
| Validation & Formulaires | Zod & React Hook Form | Contrôle et validation stricte des données saisies par les utilisateurs |
| Gestion d'états de l'application | Zustand | Contrôle l'état des modales de l'application |
| Gestionnaire de paquets | pnpm | Gestion rapide et efficace des dépendances |

## Installation & utilisation

> [!IMPORTANT]
> Ce projet nécessite le [fork de l'API OpenClassrooms](https://github.com/ifTrueReturnFalse/retraining-project-management-ai-backend) pour fonctionner correctement.  
> Ce projet utilise [pnpm](https://pnpm.io/) pour la gestion des dépendances. Assurez-vous de l'avoir installé sur votre machine.

1. Cloner le dépôt

```bash
git clone https://github.com/ifTrueReturnFalse/retraining-project-management-ai.git
cd retraining-project-management-ai
```

2. Installer les dépendances

```bash
pnpm install
```

3. Lancer l'application

```bash
pnpm dev
```

L'application sera accessible à l'adresse `http://localhost:3000` (ou le port indiqué dans votre terminal).

## Points Techniques & Conception

Le développement de cette plateforme a nécessité la mise en œuvre de plusieurs concepts techniques avancés :

La fiabilité des données était au cœur du développement.

- **Validation End-to-End** : Utilisation de Zod pour définir des schémas de validation uniques, partagés entre le frontend (React Hook Form) et l'API backend, garantissant une intégrité totale des données.
- **Gestion d'État Globale** : Implémentation de l'API Context de React (`UserContext`) pour distribuer efficacement les informations de l'utilisateur authentifié à travers toute l'application.
- **Sécurité des Formulaires** : Composants de formulaires modulaires et gestion des mots de passe sécurisée via l'API, avec des retours d'erreurs clairs gérés par `ApiError`.

---

## 🇬🇧 English Version

This repository contains a full-stack **project and task management** application, as part of my training with OpenClassrooms.

The main objective is to develop a **collaborative web platform** allowing users to intuitively create, assign, and track the progress of their tasks. The application is designed to be robust, secure, and provide a seamless user experience.

The project was built using **Next.js (App Router**) and **TypeScript**, with a strong focus on data reliability (using Zod) and global state management.

### Key Features

- **Task Management**: Create and track tasks with specific statuses (To Do, In Progress, Done), priorities, and due dates.
- **Team Collaboration**: Assign tasks to multiple team members and engage through an integrated commenting system.
- **User Account Dashboard**: Dedicated interface for users to update their profile information (name, email) and securely change their password.
- **Strict Data Validation**: Fully validated forms on both the client and server sides to prevent errors.
- **Real-time Notifications**: Interactive visual feedback (toasts) upon data updates or actions.
- **AI Task Generation**: Uses project data to create tasks based on user requests.

## Tech Stack

| Stack |	Tool | Role |
|:---|:---|:---|
| Language |	TypeScript |	Static typing for more robust and maintainable code |
| Frontend | Framework |	Next.js / React	Component-based user interface construction and hybrid rendering |
| Validation & Forms |	Zod & React Hook Form |	Strict control and validation of user input data |
| State management | Zustand | Controls modal states throughout the app |
| Package Manager |	pnpm |	Fast and efficient dependency management |

## Installation & Usage

> [!IMPORTANT]
> This project requires this [OpenClassrooms API fork](https://github.com/ifTrueReturnFalse/retraining-project-management-ai-backend) to run correctly.  
> This project uses [pnpm](https://pnpm.io/) for dependency management. Make sure you have it installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/ifTrueReturnFalse/retraining-project-management-ai.git
cd retraining-project-management-ai
```

2. Install dependencies:

```bash
pnpm install
```

3. Launch the application:

```bash
pnpm dev
```

The application will be accessible at `http://localhost:3000` (or the port indicated in your terminal).

## Technical Highlights & Design
The development of this platform required the implementation of several advanced technical concepts:

Data reliability was at the core of the development process.

- **End-to-End Validation**: Use of **Zod** to define unique validation schemas shared between the frontend (via React Hook Form) and the backend API, ensuring total data integrity.
- **Global State Management**: Implementation of React's Context API (`UserContext`) to efficiently distribute authenticated user information throughout the application.
- **Form Security**: Modular form components and secure password management via the API, featuring clear error handling managed through custom `ApiError` instances.
