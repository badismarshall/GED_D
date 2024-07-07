import * as z from "zod"

export const MessageValidation = z.object({
    title: z.string().min(2, {message: "Trop court."}).max(10000), /* Titre de Document*/
    number: z.preprocess((a) => parseInt(z.string().parse(a),10), z.number().min(0, {message: "Numéro doit être positif."})).default(1), /* Num de document */
    nbattachments: z.preprocess((a) => parseInt(z.string().parse(a),10), z.number().min(0, {message: "Nombre d'attachement doit être positif."})).default(0), /* Nombre de pièces jointes*/
    sendingdate: z.date(), /* Date d'envoi */
    datereceipt: z.date(), /* Date de réciption */
    expediteur: z.string().min(2, {message: 'Sélectionner une unité'}).max(1000).default(""), /* L'expiditeur */
    file: z.custom<File[]>(), /* Le fichie du document */ 
    arrived: z.string().default("false"), /* Sortant ou Entrant */
  })


  export const EmployeValidation = z.object(
    {
      firstname: z.string().min(3, {message: "Trop court"}).max(150), /* Nom */
      lastname: z.string().min(3, {message: "Trop court"}).max(150), /* Prénom */
      rank: z.string().min(1, {message: "Ajouter le grade militaire"}).max(1000).default(''),  /* Grade */
      registrationNumber: z.string(), /* we need maybe to format it */ /* Matricule */
      job: z.string().min(1, {message: "Ajouter la fontion d'employé"}).max(1000).default(''), /* Emploi ou Poste */
      phoneNumber: z.string(), /* Numero Tel */
      dateOfBridth: z.date(), /* Date de naissance */
      province: z.string().min(1, {message: "Ajoute la Wilaya"}).max(200), /* Wilaya de naissance */
      address: z.string().min(2, {message: "Ajouter l'address"}).max(300), /* Address */
      personalId: z.string(), /* Matricule civile */
      healthInsuranceNumber :  z.string(), /* we need maybe to format it */ /* Num d'assurence */
      sex: z.string().min(1, {message: "Ajouter le sexe"}).max(90), /* Masculin, Féminin */
      portrait: z.custom<File[]>(), /* Une image d'employé */
      blood: z.string().min(1, {message: "Ajouter le groupe sanguin"}).max(10) /* Groupe sanguin */ 
    }
  )

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  })

  export const UploadEmployeeFilesValidation = z.object({
    file: z.custom<File[]>(),
  })
