
/* eslint-disable */
export const categories = [
    {
        id      : 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        parentId: null,
        name    : 'Manager',
        slug    : 'mens',
    },
    {
        id      : '07986d93-d4eb-4de1-9448-2538407f7254',
        parentId: null,
        name    : 'developpeur',
        slug    : 'ladies',
    },
    
];
export const brands = [
    {
        id  : 'e1789f32-9475-43e7-9256-451d2e3a2282',
        name: 'Benton',
        slug: 'benton',
    },
    {
        id  : '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        name: 'Capmia',
        slug: 'capmia',
    },
    {
        id  : 'f9987124-7ada-4b93-bef7-35280b3ddbd7',
        name: 'Lara',
        slug: 'lara',
    },
    {
        id  : '5913ee46-a497-41db-a118-ee506011529f',
        name: 'Premera',
        slug: 'premera',
    },
    {
        id  : '2c4d98d8-f334-4125-9596-862515f5526b',
        name: 'Zeon',
        slug: 'zeon',
    },
];
export const tags = [
    {
        id   : '167190fa-51b4-45fc-a742-8ce1b33d24ea',
        title: 'mens',
    },
    {
        id   : '3baea410-a7d6-4916-b79a-bdce50c37f95',
        title: 'ladies',
    },
    {
        id   : '8ec8f60d-552f-4216-9f11-462b95b1d306',
        title: 'unisex',
    },
    {
        id   : '8837b93f-388b-43cc-851d-4ca8f23f3a61',
        title: '44mm',
    },
    {
        id   : '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
        title: '40mm',
    },
    {
        id   : '2300ac48-f268-466a-b765-8b878b6e14a7',
        title: '5 ATM',
    },
    {
        id   : '0b11b742-3125-4d75-9a6f-84af7fde1969',
        title: '10 ATM',
    },
    {
        id   : '0fc39efd-f640-41f8-95a5-3f1d749df200',
        title: 'automatic',
    },
    {
        id   : '7d6dd47e-7472-4f8b-93d4-46c114c44533',
        title: 'chronograph',
    },
    {
        id   : 'b1286f3a-e2d0-4237-882b-f0efc0819ec3',
        title: 'watch',
    },
];
export const vendors = [
    {
        id  : '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        name: 'Evel',
        slug: 'evel',
    },
    {
        id  : '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        name: 'Mivon',
        slug: 'mivon',
    },
    {
        id  : '05ebb527-d733-46a9-acfb-a4e4ec960024',
        name: 'Neogen',
        slug: 'neogen',
    },
];


export const users = [
    {
        id: "1",
        firstname: "John",
        lastname: "Doe",
        phone_number: "123456789",
        rolename: "Admin",
        email: "john.doe@example.com",
        createdAt: "2024-04-02T10:00:00Z"
    },
    {
        id: "2",
        firstname: "Alice",
        lastname: "Smith",
        phone_number: "987654321",
        rolename: "User",
        email: "alice.smith@example.com",
        createdAt: "2024-04-01T15:30:00Z"
    },
    {
        id: "3",
        firstname: "Mohammed",
        lastname: "Abdullah",
        phone_number: "555555555",
        rolename: "User",
        email: "m.abdullah@example.com",
        createdAt: "2024-03-30T08:45:00Z"
    },
    {
        id: "4",
        firstname: "Maria",
        lastname: "Garcia",
        phone_number: "444444444",
        rolename: "Admin",
        email: "maria.garcia@example.com",
        createdAt: "2024-04-02T14:20:00Z"
    },
    {
        id: "5",
        firstname: "Chen",
        lastname: "Wei",
        phone_number: "777777777",
        rolename: "User",
        email: "chen.wei@example.com",
        createdAt: "2024-04-01T11:10:00Z"
    },
    {
        id: "6",
        firstname: "Emily",
        lastname: "Jones",
        phone_number: "666666666",
        rolename: "Admin",
        email: "emily.jones@example.com",
        createdAt: "2024-03-29T16:55:00Z"
    },
    {
        id: "7",
        firstname: "Luca",
        lastname: "Ricci",
        phone_number: "888888888",
        rolename: "User",
        email: "luca.ricci@example.com",
        createdAt: "2024-03-31T09:25:00Z"
    },
    {
        id: "8",
        firstname: "Yuki",
        lastname: "Tanaka",
        phone_number: "999999999",
        rolename: "User",
        email: "y.tanaka@example.com",
        createdAt: "2024-04-02T07:40:00Z"
    },
    {
        id: "9",
        firstname: "Fatima",
        lastname: "Khan",
        phone_number: "333333333",
        rolename: "Admin",
        email: "fatima.khan@example.com",
        createdAt: "2024-04-01T18:15:00Z"
    },
    {
        id: "10",
        firstname: "Alexandre",
        lastname: "Dupont",
        phone_number: "222222222",
        rolename: "User",
        email: "a.dupont@example.com",
        createdAt: "2024-03-30T13:00:00Z"
    }
];

export const UsersPagination = {
    items: users,
    page: 1,
    limit: 10,
    totalCount: users.length
};
// Exemple de données pour la structure de pagination des projets

// Exemple de données pour la liste des projets
export const  ProjectsList = [
    {
        id: "1",
        name: "Project 1",
        type: "Type A"
    },
    {
        id: "2",
        name: "Project 2",
        type: "Type B"
    },
    // Ajouter d'autres projets si nécessaire...
];

// Exemple de données pour le décompte des projets
export const  ProjectsCount = {
    count: 2 // Total number of projects
};

// Exemple de données pour les détails d'un projet
export const  ProjectsDetails = {
    id: "1",
    name: "Project 1",
    type: "Type A",
    description: "Description du projet 1",
    status: "En cours",
    start_date: "2024-03-01",
    end_date: "2024-05-30",
    budget: "10000",
    priority: "Haute",
    categories: ["catégorie1", "catégorie2"],
    files_path: ["/path/to/file1", "/path/to/file2"],
    product_owner: "1",
    product_ownerName: "John Doe",
    companyID: "1",
    companyName: "Nom de la société",
    createdAt: "2024-03-15T08:00:00Z"
};

export const projects = [
    {
        id: "1",
        name: "Project 1",
        type: "Type A",
        description: "Description du projet 1",
        status: "En cours",
        end_date: "2024-05-30",
        budget: "10000",
        createdAt: "2024-03-15T08:00:00Z"
    },
    {
        id: "2",
        name: "Project 2",
        type: "Type B",
        description: "Description du projet 2",
        status: "Terminé",
        end_date: "2024-06-15",
        budget: "15000",
        createdAt: "2024-04-01T10:30:00Z"
    },
    // Ajouter d'autres projets si nécessaire...
] ;
export const ProjectsPagination = {
    items: projects,
    page: 1,
    limit: 10,
    totalCount: projects.length
};