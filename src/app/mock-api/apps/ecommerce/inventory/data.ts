
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
        crebudgetatedAt: "2024-03-15T08:00:00Z"
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
    totalCount: projects.length,
};






export const a = [
    {
        id: "1",
        start_date: "2024-04-01",
        end_date: "2024-04-10",
        status: "open",
        priority: "high",
        assigned_to: "user1",
        created_at: "2024-04-01T12:00:00Z"
    },
    {
        id: "2",
        start_date: "2024-04-05",
        end_date: "2024-04-15",
        status: "closed",
        priority: "medium",
        assigned_to: "user2",
        created_at: "2024-04-05T09:30:00Z"
    },
    {
        id: "3",
        start_date: "2024-04-10",
        end_date: "2024-04-20",
        status: "open",
        priority: "low",
        assigned_to: "user3",
        created_at: "2024-04-10T15:45:00Z"
    },
    {
        id: "4",
        start_date: "2024-04-15",
        end_date: "2024-04-25",
        status: "open",
        priority: "high",
        assigned_to: "user1",
        created_at: "2024-04-15T08:00:00Z"
    },
    {
        id: "5",
        start_date: "2024-04-20",
        end_date: "2024-04-30",
        status: "closed",
        priority: "medium",
        assigned_to: "user2",
        created_at: "2024-04-20T11:20:00Z"
    },
    {
        id: "6",
        start_date: "2024-04-25",
        end_date: "2024-05-05",
        status: "open",
        priority: "low",
        assigned_to: "user3",
        created_at: "2024-04-25T16:10:00Z"
    }
];

export const user = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    country: 'USA',
    status: true,
    createdAt: '2024-04-07T12:00:00Z',
    dateOfBirth: '1990-01-01T00:00:00Z',
    gender: 'Male',
    address: '123 Main Street',
    phoneNumber: '+1 (555) 123-4567',
    dateOfHire: '2022-01-01T00:00:00Z',
    lastLogin: '2024-04-06T15:30:00Z',
    department_name: 'Engineering',
    role_id: '456e7890-e12a-34b5-c678-901234567890',
    company_id: 'abcde123-456f-789g-hi12-jklm34567890'
};
export const board = {
    id: 'fa56a16a-4bce-4b1e-9f71-743942e0c6d1',
    title: 'Task Board',
    description: 'Board for managing tasks',
    icon: 'task_board_icon',
    last_activity: '2023-04-15T10:30:00Z', // Utilisation de new Date pour créer une instance Date
    projectID: '8b32a965-0d56-4af3-b92c-1553c5e1d18b',
    companyID: '5e7c4d18-7bd4-45a3-b07d-8f53a44b64ac',
    createdAt: '2023-04-10T08:45:00Z', // Utilisation de new Date pour créer une instance Date
};

export const boards = [
    {
        id: 'fa56a16a-4bce-4b1e-9f71-743942e0c6d1',
        title: 'Task Board 1',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-15T10:30:00Z',
        projectID: '8b32a965-0d56-4af3-b92c-1553c5e1d18b',
        companyID: '5e7c4d18-7bd4-45a3-b07d-8f53a44b64ac',
        createdAt: '2023-04-10T08:45:00Z'
    },
    {
        id: '6b20d7fb-3d04-4e35-9f9c-1bfe757a1e5e',
        title: 'Task Board 2',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-14T14:20:00Z',
        projectID: '9c58e452-9142-4232-b627-982168fa9e3f',
        companyID: '7f42a19b-3c90-47fd-b44f-2852b6218a6d',
        createdAt: '2023-04-09T11:15:00Z'
    },
    {
        id: 'c88f4f85-ef60-409b-8411-3d06d76db392',
        title: 'Task Board 3',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-13T16:55:00Z',
        projectID: '2a1e877b-2dd8-4e9d-bf51-9a7cd7926094',
        companyID: '3b2d90ea-548e-4b99-b86a-fdd158e3a7d1',
        createdAt: '2023-04-08T09:25:00Z'
    },
    {
        id: 'f647d50e-4c29-4e52-89b6-301aa3d1a7c2',
        title: 'Task Board 4',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-12T07:40:00Z',
        projectID: '6d2f8e89-6e0f-497f-9a3b-f1aebd3c1d47',
        companyID: '8c64b734-80bb-4c71-b518-cd7b300fa94f',
        createdAt: '2023-04-07T18:15:00Z'
    },
    {
        id: 'dbb00e95-8887-4d3a-a1ee-fb13c18b9240',
        title: 'Task Board 5',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-11T13:00:00Z',
        projectID: '4f3a8c0d-9031-4bea-b510-9e618ce1a272',
        companyID: '6a5e9cd5-2980-45fc-a3cb-6aa508d75f52',
        createdAt: '2023-04-06T10:00:00Z'
    },
    {
        id: '90d3200d-0e3a-4c09-8567-94e1bc6fb2ae',
        title: 'Task Board 6',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-10T18:00:00Z',
        projectID: '3a3d597a-3d0e-4f18-a700-69cc05a787cc',
        companyID: '4b4b8380-f835-4c60-8d57-724e4d16c03e',
        createdAt: '2023-04-05T14:30:00Z'
    },
    {
        id: 'ab7a7fe0-9b0d-4312-b6a2-0b3f40a75197',
        title: 'Task Board 7',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-09T08:30:00Z',
        projectID: '1c567da5-9da8-4a0f-880d-6a59f596e76d',
        companyID: '2d55db87-7c5a-41a4-b8d2-44b0b778ea0e',
        createdAt: '2023-04-04T12:45:00Z'
    },
    {
        id: 'feee74d9-b687-4e05-af4e-2d3d3d9251c6',
        title: 'Task Board 8',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-08T15:45:00Z',
        projectID: '5e3b8f74-4df8-4d52-bf86-40cbff00b027',
        companyID: '6f6f674b-c306-4e54-9277-8d8aaf9c48f4',
        createdAt: '2023-04-03T16:00:00Z'
    },
    {
        id: 'bd0180d8-839f-4a93-b199-1651d8a97bcf',
        title: 'Task Board 9',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-07T12:00:00Z',
        projectID: '7d6e9f7b-0b6c-49bb-92fc-f36f63fdbe9c',
        companyID: '8a3e8b6f-21e4-4398-bfa0-3a2455a195d9',
        createdAt: '2023-04-02T20:00:00Z'
    },
    {
        id: 'd33a5e64-b4b3-4c7f-9a1b-eb07af784d5e',
        title: 'Task Board 10',
        description: 'Board for managing tasks',
        icon: 'task_board_icon',
        last_activity: '2023-04-06T09:00:00Z',
        projectID: '8b0a3a11-c2a5-4c82-a8b2-8573e681d7f1',
        companyID: '9c2b92b4-7aa5-4a21-97fc-7d68fdfe41c0',
        createdAt: '2023-04-01T22:30:00Z'
    }
];


export const BoardsPagination = {
    items: boards,
    page: 1,
    limit: 10,
    totalCount: boards.length
};
export const cards = [
    {
        id: "1",
        title: "Task 1",
        position: 1,
        userStory: "As a user, I want to be able to create a new task",
        filesPath: ["path/to/file1", "path/to/file2"],
        categoriesID: ["cat1", "cat2"],
        startDate: "2024-04-10",
        endDate: "2024-04-15",
        assignedTo: "user1",
        cardID: "card1",
        listID: "list1",
        projectID: "project1",
        companyID: "company1",
        createdAt: "2024-04-10T08:45:00Z"
    },
    {
        id: "2",
        title: "Task 2",
        position: 2,
        userStory: "As a user, I want to be able to delete a task",
        filesPath: ["path/to/file3"],
        categoriesID: ["cat1", "cat3"],
        startDate: "2024-04-12",
        endDate: "2024-04-20",
        assignedTo: "user2",
        cardID: "card2",
        listID: "list2",
        projectID: "project1",
        companyID: "company1",
        createdAt: "2024-04-11T10:30:00Z"
    },
    {
        id: "3",
        title: "Task 3",
        position: 3,
        userStory: "As a user, I want to be able to update a task",
        filesPath: ["path/to/file4"],
        categoriesID: ["cat2", "cat3"],
        startDate: "2024-04-15",
        endDate: "2024-04-25",
        assignedTo: "user3",
        cardID: "card3",
        listID: "list3",
        projectID: "project2",
        companyID: "company2",
        createdAt: "2024-04-13T15:20:00Z"
    },
    {
        id: "4",
        title: "Task 4",
        position: 4,
        userStory: "As a user, I want to be able to complete a task",
        filesPath: ["path/to/file5"],
        categoriesID: ["cat1", "cat3"],
        startDate: "2024-04-20",
        endDate: "2024-04-30",
        assignedTo: "user1",
        cardID: "card4",
        listID: "list1",
        projectID: "project2",
        companyID: "company1",
        createdAt: "2024-04-16T09:00:00Z"
    },
    {
        id: "5",
        title: "Task 5",
        position: 5,
        userStory: "As a user, I want to be able to prioritize tasks",
        filesPath: ["path/to/file6"],
        categoriesID: ["cat1", "cat2"],
        startDate: "2024-04-18",
        endDate: "2024-04-22",
        assignedTo: "user2",
        cardID: "card5",
        listID: "list2",
        projectID: "project1",
        companyID: "company2",
        createdAt: "2024-04-17T14:45:00Z"
    },
    {
        id: "6",
        title: "Task 6",
        position: 6,
        userStory: "As a user, I want to be able to assign tasks to team members",
        filesPath: ["path/to/file7"],
        categoriesID: ["cat2", "cat3"],
        startDate: "2024-04-22",
        endDate: "2024-04-28",
        assignedTo: "user3",
        cardID: "card6",
        listID: "list3",
        projectID: "project2",
        companyID: "company1",
        createdAt: "2024-04-20T11:30:00Z"
    },
    {
        id: "7",
        title: "Task 7",
        position: 7,
        userStory: "As a user, I want to be able to view task details",
        filesPath: ["path/to/file8"],
        categoriesID: ["cat1", "cat3"],
        startDate: "2024-04-25",
        endDate: "2024-05-02",
        assignedTo: "user1",
        cardID: "card7",
        listID: "list1",
        projectID: "project1",
        companyID: "company2",
        createdAt: "2024-04-23T16:20:00Z"
    },
    {
        id: "8",
        title: "Task 8",
        position: 8,
        userStory: "As a user, I want to be able to filter tasks",
        filesPath: ["path/to/file9"],
        categoriesID: ["cat1", "cat2"],
        startDate: "2024-04-28",
        endDate: "2024-05-05",
        assignedTo: "user2",
        cardID: "card8",
        listID: "list2",
        projectID: "project2",
        companyID: "company1",
        createdAt: "2024-04-26T10:15:00Z"
    },
    {
        id: "9",
        title: "Task 9",
        position: 9,
        userStory: "As a user, I want to be able to schedule tasks",
        filesPath: ["path/to/file10"],
        categoriesID: ["cat2", "cat3"],
        startDate: "2024-05-01",
        endDate: "2024-05-10",
        assignedTo: "user3",
        cardID: "card9",
        listID: "list3",
        projectID: "project1",
        companyID: "company2",
        createdAt: "2024-04-30T13:45:00Z"
    },
    {
        id: "10",
        title: "Task 10",
        position: 10,
        userStory: "As a user, I want to be able to archive tasks",
        filesPath: ["path/to/file11"],
        categoriesID: ["cat1", "cat2"],
        startDate: "2024-05-05",
        endDate: "2024-05-15",
        assignedTo: "user1",
        cardID: "card10",
        listID: "list1",
        projectID: "project2",
        companyID: "company1",
        createdAt: "2024-05-03T09:30:00Z"
    },
];
export const CardsPagination = {
    items: cards,
    page: 1,
    limit: 10,
    totalCount: cards.length
};
export const card_comments=[
    {
        id: "1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        files_paths: ["file1.jpg", "file2.pdf"],
        projectID: "123e4567-e89b-12d3-a456-426614174000",
        companyID: "123e4567-e89b-12d3-a456-426614174001",
        cardID: "123e4567-e89b-12d3-a456-426614174002",
        createdAt: "2024-04-08T12:00:00Z"
    },
    {
        id: "2",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        files_paths: ["file3.png", "file4.docx"],
        projectID: "123e4567-e89b-12d3-a456-426614174003",
        companyID: "123e4567-e89b-12d3-a456-426614174004",
        cardID: "123e4567-e89b-12d3-a456-426614174005",
        createdAt: "2024-04-07T09:30:00Z"
    },
    {
        id: "3",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        files_paths: ["file5.jpg", "file6.pdf"],
        projectID: "123e4567-e89b-12d3-a456-426614174006",
        companyID: "123e4567-e89b-12d3-a456-426614174007",
        cardID: "123e4567-e89b-12d3-a456-426614174008",
        createdAt: "2024-04-06T15:45:00Z"
    },
    {
        id: "4",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        files_paths: ["file7.png", "file8.docx"],
        projectID: "123e4567-e89b-12d3-a456-426614174009",
        companyID: "123e4567-e89b-12d3-a456-426614174010",
        cardID: "123e4567-e89b-12d3-a456-426614174011",
        createdAt: "2024-04-05T08:20:00Z"
    },
    {
        id: "5",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        files_paths: ["file9.jpg", "file10.pdf"],
        projectID: "123e4567-e89b-12d3-a456-426614174012",
        companyID: "123e4567-e89b-12d3-a456-426614174013",
        cardID: "123e4567-e89b-12d3-a456-426614174014",
        createdAt: "2024-04-04T10:10:00Z"
    },
]
export const Card_commentsPagination = {
    items: card_comments,
    page: 1,
    limit: 10,
    totalCount: card_comments.length
};
export const card_logs= [
    {
        id: "1",
        name: "John Doe",
        companyID: "101",
        companyName: "Example Company 1",
        createdAt: "2024-04-08T12:00:00Z"
    },
    {
        id: "2",
        name: "Jane Smith",
        companyID: "102",
        companyName: "Example Company 2",
        createdAt: "2024-04-07T09:30:00Z"
    },
    {
        id: "3",
        name: "Michael Johnson",
        companyID: "103",
        companyName: "Example Company 3",
        createdAt: "2024-04-06T15:45:00Z"
    },
    {
        id: "4",
        name: "Emily Brown",
        companyID: "104",
        companyName: "Example Company 4",
        createdAt: "2024-04-05T08:20:00Z"
    },
    {
        id: "5",
        name: "Daniel Wilson",
        companyID: "105",
        companyName: "Example Company 5",
        createdAt: "2024-04-04T10:10:00Z"
    },
    {
        id: "6",
        name: "Sophia Martinez",
        companyID: "106",
        companyName: "Example Company 6",
        createdAt: "2024-04-03T14:30:00Z"
    }
];
export const Card_logsPagination = {
    items: card_logs,
    page: 1,
    limit: 10,
    totalCount: card_logs.length
};
export const categories =[
    {
      id: "cat_001",
      name: "Electronics",
      description: "Includes gadgets, appliances, and electronic accessories.",
      color: "Blue",
      companyID: "comp_001",
      createdAt: "2024-04-01T08:00:00Z"
    },
    {
      id: "cat_002",
      name: "Clothing",
      description: "Various types of attire for men, women, and children.",
      color: "Green",
      companyID: "comp_002",
      createdAt: "2024-04-02T10:15:00Z"
    },
    {
      id: "cat_003",
      name: "Books",
      description: "Fiction, non-fiction, and educational literature.",
      color: "Purple",
      companyID: "comp_003",
      createdAt: "2024-04-03T14:30:00Z"
    },
    {
      id: "cat_004",
      name: "Home & Garden",
      description: "Items for home decor, gardening, and DIY projects.",
      color: "Red",
      companyID: "comp_001",
      createdAt: "2024-04-04T11:45:00Z"
    },
    {
      id: "cat_005",
      name: "Sports & Outdoors",
      description: "Equipment and gear for various sports and outdoor activities.",
      color: "Orange",
      companyID: "comp_002",
      createdAt: "2024-04-05T13:20:00Z"
    },
    {
      id: "cat_006",
      name: "Health & Beauty",
      description: "Products related to personal care, wellness, and beauty.",
      color: "Turquoise",
      companyID: "comp_003",
      createdAt: "2024-04-06T16:00:00Z"
    },
    {
      id: "cat_007",
      name: "Toys & Games",
      description: "Playthings and games for children of all ages.",
      color: "Dark Slate Gray",
      companyID: "comp_001",
      createdAt: "2024-04-07T09:30:00Z"
    },
    {
      id: "cat_008",
      name: "Food & Beverages",
      description: "Various food items, beverages, and ingredients.",
      color: "Nephritis",
      companyID: "comp_002",
      createdAt: "2024-04-08T12:45:00Z"
    },
    {
      id: "cat_009",
      name: "Automotive",
      description: "Parts, accessories, and supplies for vehicles.",
      color: "Carrot",
      companyID: "comp_003",
      createdAt: "2024-04-09T15:10:00Z"
    },
    {
      id: "cat_010",
      name: "Pets",
      description: "Supplies and products for pets and pet care.",
      color: "Sun Flower",
      companyID: "comp_001",
      createdAt: "2024-04-10T08:20:00Z"
    }
  ];
  export const CategoriesPagination = {
    items: categories,
    page: 1,
    limit: 10,
    totalCount: categories.length
};
export const companies = [
    {
        id: "2",
        name: "ABC Corporation",
        website: "https://www.abccorp.com",
        email: "contact@abccorp.com",
        phone_number: "+987654321",
        country_code: "US",
        adress: "456 Oak Street, City, State, Zip",
        createdAt: "2023-11-15T09:30:00Z"
    },
    {
        id: "3",
        name: "XYZ Ltd.",
        website: "https://www.xyzltd.com",
        email: "info@xyzltd.com",
        phone_number: "+44123456789",
        country_code: "UK",
        adress: "789 Maple Avenue, City, County, Postal",
        createdAt: "2022-08-20T15:45:00Z"
    },
    {
        id: "4",
        name: "Tech Innovations Inc.",
        website: "https://www.techinnovationsinc.com",
        email: "support@techinnovationsinc.com",
        phone_number: "+15556667777",
        country_code: "CA",
        adress: "101 Pine Street, City, Province, Postal Code",
        createdAt: "2024-01-05T08:00:00Z"
    },
    {
        id: "5",
        name: "Global Solutions Ltd.",
        website: "https://www.globalsolutionsltd.com",
        email: "info@globalsolutionsltd.com",
        phone_number: "+611234567890",
        country_code: "AU",
        adress: "321 Elm Road, City, State, Postal",
        createdAt: "2023-05-10T11:20:00Z"
    },
    {
        id: "6",
        name: "Nature's Harvest Organics",
        website: "https://www.naturesharvestorganics.com",
        email: "info@naturesharvestorganics.com",
        phone_number: "+7890123456",
        country_code: "NZ",
        adress: "876 Cedar Lane, City, Region, Postal",
        createdAt: "2024-02-28T14:00:00Z"
    }
];
export const CompaniesPagination = {
    items: companies,
    page: 1,
    limit: 10,
    totalCount: companies.length};
     export const issues = [

        {
            
            id: "1",
            start_date: "2024-04-10",
            end_date: "2024-04-20",
            status: "In Progress",
            priority: "High",
            files_path: "/path/to/files",
            assigned_to: "John Doe",
            project_id: "123",
            company_id: "456",
            task_id: "789",
            createdAt: "2024-04-10T08:00:00Z",
    },{
        id: "2",
        start_date: "2024-04-15",
        end_date: "2024-04-25",
        status: "Pending",
        priority: "Medium",
        files_path: "/path/to/other/files",
        assigned_to: "Alice Smith",
        project_id: "456",
        company_id: "789",
        task_id: "101112",
        createdAt: "2024-04-11T09:30:00Z"
      },
      {
        id:"3",
        start_date: "2024-04-20",
        end_date: "2024-05-01",
        status: "Completed",
        priority: "Low",
        files_path: "/path/to/more/files",
        assigned_to: "Bob Johnson",
        project_id: "789",
        company_id: "101112",
        task_id: "131415",
        createdAt: "2024-04-12T10:45:00Z"
      }
,{
    id: "4",
    start_date: "2024-04-25",
    end_date: "2024-05-05",
    status: "In Progress",
    priority: "High",
    files_path: "/path/to/new/files",
    assigned_to: "Eva Garcia",
    project_id:" 101112",
    company_id: "131415",
    task_id: "161718",
    createdAt: "2024-04-13T11:15:00Z"
  },
  {
    id: "5",
    start_date: "2024-04-30",
    end_date: "2024-05-10",
    status: "Pending",
    priority: "Medium",
    files_path: "/path/to/important/files",
    assigned_to: "David Brown",
    project_id: "131415",
    company_id: "161718",
    task_id: "192021",
    createdAt: "2024-04-14T12:00:00Z"
  },
,{
    id: "6",
    start_date: "2024-05-05",
    end_date: "2024-05-15",
    status: "In Progress",
    priority: "High",
    files_path: "/path/to/project/files",
    assigned_to: "Sophia Rodriguez",
    project_id: "161718",
    company_id: "192021",
    task_id: "222324",
    createdAt: "2024-04-15T13:20:00Z"
  }
,{
    id: "7",
    start_date: "2024-05-10",
    end_date: "2024-05-20",
    status: "Completed",
    priority: "Low",
    files_path: "/path/to/task/files",
    assigned_to: "Michael Wilson",
    project_id: "192021",
    company_id: "222324",
    task_id: "252627",
    createdAt: "2024-04-16T14:10:00Z"
  }
            ];
     export const IssuesPagination = {
        items: issues,
        page: 1,
        limit: 10,
        totalCount: issues.length,
    };
export const lists = [
        {
            id: '1',
            title: 'To Do',
            position: '1',
            projectid: '123',
            boardid: '456',
            createdAt: '2024-04-08T12:00:00Z',
        },
        {
            id: '2',
            title: 'In Progress',
            position: '2',
            projectid: '123',
            boardid: '456',
            createdAt: '2024-04-08T12:00:00Z',
        },
        {
            id: '3',
            title: 'Done',
            position: '3',
            projectid: '123',
            boardid: '456',
            createdAt: '2024-04-08T12:00:00Z',
        }
    ];
    export const ListsPagination = {
        items: lists,
        page: 1,
        limit: 10,
        totalCount: lists.length,
    };
    export const notifications = [
        {
            id: '1',
            type: 'email',
            content: 'You have a new email.',
            seen: 'false',
            createdAt: '2024-04-08T12:00:00Z',
        },
        {
            id: '2',
            type: 'reminder',
            content: 'Reminder: Meeting at 2:00 PM.',
            seen: 'true',
            createdAt: '2024-04-08T09:00:00Z',
        },
        {
            id: '3',
            type: 'notification',
            content: 'New update available. Click here to download.',
            seen: 'false',
            createdAt: '2024-04-07T18:00:00Z',
        },
        {
            id: '4',
            type: 'message',
            content: 'You have a new message from John Doe.',
            seen: 'true',
            createdAt: '2024-04-06T15:30:00Z',
        }
    ];
    export const NotificationsPagination = {
        items: notifications,
        page: 1,
        limit: 10,
        totalCount: notifications.length,
    };
    export const permissions= [
        {
            id: '1',
            roleID: 'role123',
            companyID: 'company456',
            featureID: 'feature789',
            featureName: 'User Management',
            createPerm: true,
            readPerm: true,
            updatePerm: false,
            deletePerm: false,
            createdByUser: 'user123',
            createdAt: '2024-04-08T12:00:00Z',
        },
        {
            id: '2',
            roleID: 'role456',
            companyID: 'company789',
            featureID: 'feature012',
            featureName: 'Settings',
            createPerm: true,
            readPerm: true,
            updatePerm: true,
            deletePerm: true,
            createdByUser: 'user456',
            createdAt: '2024-04-09T10:30:00Z',
        },
        {
            id: '3',
            roleID: 'role789',
            companyID: 'company012',
            featureID: 'feature345',
            featureName: 'Reports',
            createPerm: false,
            readPerm: true,
            updatePerm: false,
            deletePerm: false,
            createdByUser: 'user789',
            createdAt: '2024-04-10T08:45:00Z',
        }
    ];
    export const PermissionsPagination = {
        items: permissions,
        page: 1,
        limit: 10,
        totalCount: permissions.length,
    };
    export const tasks =
    [{
        id: '1',
        name: 'Implement Login Page',
        description: 'Develop the login page for the application.',
        start_date: new Date('2024-04-11'),
        end_date: '2024-04-20',
        status: 'In Progress',
        priority: 'High',
        done_ratio: 30,
        files_path: ['/path/to/login_design.jpg', '/path/to/login_code.ts'],
        categories: ['Authentication', 'UI/UX'],
        assignedTo: 'user123',
        projectID: 'project123',
        task_parentID: 'parentTask123',
        categoryID: 'category123',
        createdAt: new Date('2024-04-10T08:00:00'),
      },
      
  {
        id: '2',
        name: 'Update Database Schema',
        description: 'Modify the database schema to support new features.',
        start_date: new Date('2024-04-15'),
        end_date: '2024-04-30',
        status: 'Pending',
        priority: 'Medium',
        done_ratio: 0,
        files_path: ['/path/to/schema_diagram.png', '/path/to/sql_script.sql'],
        categories: ['Database', 'Backend'],
        assignedTo: 'user456',
        projectID: 'project456',
        task_parentID: 'parentTask456',
        categoryID: 'category456',
        createdAt: new Date('2024-04-12T09:30:00'),
      },
      
      {
        id: '3',
        name: 'Refactor Frontend Components',
        description: 'Clean up and optimize frontend components for better performance.',
        start_date: new Date('2024-04-20'),
        end_date: '2024-05-05',
        status: 'To Do',
        priority: 'Low',
        done_ratio: 0,
        files_path: ['/path/to/component1.js', '/path/to/component2.css'],
        categories: ['Frontend', 'Optimization'],
        assignedTo: 'user789',
        projectID: 'project789',
        task_parentID: 'parentTask789',
        categoryID: 'category789',
        createdAt: new Date('2024-04-18T11:45:00'),
      }
    ];
    export const TasksPagination = {
        items: tasks,
        page: 1,
        limit: 10,
        totalCount: tasks.length,
    };
    export const  task_logs = [

        {
            id: '1',
            title: 'Updated User Profile',
            description: 'User profile information updated by admin.',
            icon: 'user-circle',
            last_activity: new Date('2024-04-11T08:30:00'),
            projectID: 'project123',
            companyID: 'company456',
            createdAt: new Date('2024-04-11T08:30:00'),
          },{
            id: '2',
            title: 'Added New Feature',
            description: 'New feature added to the system.',
            icon: 'plus-circle',
            last_activity: new Date('2024-04-10T10:15:00'),
            projectID: 'project789',
            companyID: 'company123',
            createdAt: new Date('2024-04-10T10:15:00'),
          },{
            id: '3',
            title: 'Resolved Bug',
            description: 'Bug fix deployed to production environment.',
            icon: 'bug',
            last_activity: new Date('2024-04-09T14:00:00'),
            projectID: 'project456',
            companyID: 'company789',
            createdAt: new Date('2024-04-09T14:00:00'),
          }

    ]; 
    export const Task_logsPagination = {
        items: task_logs,
        page: 1,
        limit: 10,
        totalCount: task_logs.length,
    };