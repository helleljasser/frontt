import { Injectable } from '@angular/core';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { boards as boardsData, card_comments as card_commentsData, card_logs as card_logsData, cards as cardsData, categories as categoriesData, companies as companiesData, issues as issuesData, lists as listsData, notifications as notificationsData, permissions as permissionsData, projects as projectsData, task_logs as task_logsData, tasks as tasksData, user as userData, users as usersData } from 'app/mock-api/apps/ecommerce/inventory/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class ECommerceInventoryMockApi
{
    private _users: any[] = usersData;
    private _boards: any[] = boardsData;
    private _projects: any[] = projectsData;
    private _issues: any[] = issuesData ;
    private _categories: any[] = categoriesData ;
    private _companies: any[] = companiesData ;
    private _lists: any[] = listsData ;
    private _notifications: any[] = notificationsData  ;
    private _permissions: any[] = permissionsData  ;
 
    private _task_logs: any[] = task_logsData;
    private _tasks: any[] = tasksData;
    private _cards: any[] = cardsData;
    private _card_comments: any[] = card_commentsData;
    private _card_logs: any[] = card_logsData;
    private _user: any = userData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        

        // -----------------------------------------------------------------------------------------------------
        // @ Brands - GET
        // -----------------------------------------------------------------------------------------------------
       

      // @ Users - GET
// -----------------------------------------------------------------------------------------------------

this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/users', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the users
        let users: any[] | null = cloneDeep(this._users);
    
        // Sort the users
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            users.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            users.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the users
            users = users.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = users.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedUsers = users.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedUsers,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });



  
     



        // -----------------------------------------------------------------------------------------------------
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/user')
            .reply(({request}) =>
            {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the users
                const users = cloneDeep(this._users);

                // Find the user
                const user = users.find(item => item.id === id);

                // Return the response
                return [200, user];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ User - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/user')
            .reply(() =>
            {
                // Generate a new user
                const newUser = {
                    id         : FuseMockApiUtils.guid(),
                    category   : '',
                    name       : 'A New User',
                    description: '',
                    tags       : [],
                    sku        : '',
                    barcode    : '',
                    brand      : '',
                    card     : '',
                    stock      : '',
                    reserved   : '',
                    cost       : '',
                    basePrice  : '',
                    taxPercent : '',
                    price      : '',
                    weight     : '',
                    thumbnail  : '',
                    images     : [],
                    active     : false,
                };

                // Unshift the new user
                this._users.unshift(newUser);

                // Return the response
                return [200, newUser];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/user')
            .reply(({request}) =>
            {
                // Get the id and user
                const id = request.body.id;
                const user = cloneDeep(request.body.user);

                // Prepare the updated user
                let updatedUser = null;

                // Find the user and update it
                this._users.forEach((item, index, users) =>
                {
                    if ( item.id === id )
                    {
                        // Update the user
                        users[index] = assign({}, users[index], user);

                        // Store the updated user
                        updatedUser = users[index];
                    }
                });

                // Return the response
                return [200, updatedUser];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ User - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/user')
            .reply(({request}) =>
            {
                // Get the id
                const id = request.params.get('id');

                // Find the user and delete it
                this._users.forEach((item, index) =>
                {
                    if ( item.id === id )
                    {
                        this._users.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - GET
        // -----------------------------------------------------------------------------------------------------


        // -----------------------------------------------------------------------------------------------------
    
        // -----------------------------------------------------------------------------------------------------
        // @ Vendors - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/cards')
            .reply(() => [200, cloneDeep(this._cards)]);



      // @ projects - GET
// @ projects - GET
this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/projects', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);

        // Clone the projects
        let projects: any[] | null = cloneDeep(this._projects);

        // Sort the projects
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            projects.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            projects.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }

        // If search exists...
        if (search) {
            // Filter the projects
            projects = projects.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Paginate
        const totalCount = projects.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedProjects = projects.slice(startIndex, endIndex + 1);

        // Construct pagination object
        const pagination = {
            items: paginatedProjects,
            page,
            limit: size,
            totalCount,
        };

        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });


// -----------------------------------------------------------------------------------------------------
// @ Project - GET
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/project')
    .reply(({request}) =>
    {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the projects
        const projects = cloneDeep(this._projects);

        // Find the project
        const project = projects.find(item => item.id === id);

        // Return the response
        return [200, project];
    });

// -----------------------------------------------------------------------------------------------------
// @ Project - POST
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
    .onPost('api/apps/ecommerce/inventory/project')
    .reply(() =>
    {
        // Generate a new project
        const newProject = {
            id         : FuseMockApiUtils.guid(),
            category   : '',
            name       : 'A New Project',
            description: '',
            tags       : [],
            sku        : '',
            barcode    : '',
            brand      : '',
            card     : '',
            stock      : '',
            reserved   : '',
            cost       : '',
            basePrice  : '',
            taxPercent : '',
            price      : '',
            weight     : '',
            thumbnail  : '',
            images     : [],
            active     : false,
        };

        // Unshift the new project
        this._projects.unshift(newProject);

        // Return the response
        return [200, newProject];
    });

// -----------------------------------------------------------------------------------------------------
// @ Project - PATCH
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
    .onPatch('api/apps/ecommerce/inventory/project')
    .reply(({request}) =>
    {
        // Get the id and project
        const id = request.body.id;
        const project = cloneDeep(request.body.project);

        // Prepare the updated project
        let updatedProject = null;

        // Find the project and update it
        this._projects.forEach((item, index, projects) =>
        {
            if ( item.id === id )
            {
                // Update the project
                projects[index] = assign({}, projects[index], project);

                // Store the updated project
                updatedProject = projects[index];
            }
        });

        // Return the response
        return [200, updatedProject];
    });

// -----------------------------------------------------------------------------------------------------
// @ Project - DELETE
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
    .onDelete('api/apps/ecommerce/inventory/project')
    .reply(({request}) =>
    {
        // Get the id
        const id = request.params.get('id');

        // Find the project and delete it
        this._projects.forEach((item, index) =>
        {
            if ( item.id === id )
            {
                this._projects.splice(index, 1);
            }
        });

        // Return the response
        return [200, true];
    });
        
      // @ issues - GET
// @ issues - GET
this._fuseMockApiService
.onGet('api/apps/ecommerce/', 300)
.reply(({ request }) => {
    // Get available queries
    const search = request.params.get('search');
    const sort = request.params.get('sort') || 'name';
    const order = request.params.get('order') || 'asc';
    const page = parseInt(request.params.get('page') ?? '1', 10);
    const size = parseInt(request.params.get('size') ?? '10', 10);

    // Clone the issues
    let issues: any[] | null = cloneDeep(this._issues);

    // Sort the issues
    if (sort === 'id' || sort === 'name' || sort === 'active') {
        issues.sort((a, b) => {
            const fieldA = (a[sort] || '').toString().toUpperCase();
            const fieldB = (b[sort] || '').toString().toUpperCase();
            return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        });
    } else {
        issues.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
    }

    // If search exists...
    if (search) {
        // Filter the issues
        issues = issues.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Paginate
    const totalCount = issues.length;
    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
    const paginatedIssues = issues.slice(startIndex, endIndex + 1);

    // Construct pagination object
    const pagination = {
        items: paginatedIssues,
        page,
        limit: size,
        totalCount,
    };

    // Return the response
    return [
        200,
        {
            pagination,
        },
    ];
});


// -----------------------------------------------------------------------------------------------------
// @ Project - GET
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
.onGet('api/apps/ecommerce/inventory/issue')
.reply(({request}) =>
{
    // Get the id from the params
    const id = request.params.get('id');

    // Clone the issues
    const issues = cloneDeep(this._issues);

    // Find the issue
    const issue = issues.find(item => item.id === id);

    // Return the response
    return [200, issue];
});

// -----------------------------------------------------------------------------------------------------
// @ Project - POST
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
    .onPost('api/apps/ecommerce/inventory/issue')
    .reply(() =>
    {
        // Generate a new project
        const newProject = {
            id         : FuseMockApiUtils.guid(),
            category   : '',
            name       : 'A New Project',
            description: '',
            tags       : [],
            sku        : '',
            barcode    : '',
            brand      : '',
            card     : '',
            stock      : '',
            reserved   : '',
            cost       : '',
            basePrice  : '',
            taxPercent : '',
            price      : '',
            weight     : '',
            thumbnail  : '',
            images     : [],
            active     : false,
        };

        // Unshift the new project
        this._projects.unshift(newProject);

        // Return the response
        return [200, newProject];
    });
// -----------------------------------------------------------------------------------------------------
// @ Project - PATCH
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
.onPatch('api/apps/ecommerce/inventory/issue')
.reply(({request}) =>
{
    // Get the id and issue
    const id = request.body.id;
    const issue = cloneDeep(request.body.issue);

    // Prepare the updated issue
    let updatedIssue = null;

    // Find the issue and update it
    this._issues.forEach((item, index, issues) =>
    {
        if ( item.id === id )
        {
            // Update the issue
            issues[index] = assign({}, issues[index], issue);

            // Store the updated issue
            updatedIssue = issues[index];
        }
    });

    // Return the response
    return [200, updatedIssue];
});

// -----------------------------------------------------------------------------------------------------
// @ Project - DELETE
// -----------------------------------------------------------------------------------------------------
this._fuseMockApiService
.onDelete('api/apps/ecommerce/inventory/issue')
.reply(({request}) =>
{
    // Get the id
    const id = request.params.get('id');

    // Find the issue and delete it
    this._issues.forEach((item, index) =>
    {
        if ( item.id === id )
        {
            this._issues.splice(index, 1);
        }
    });

    // Return the response
    return [200, true];
});

    

      // -----------------------------------------------------------------------------------------------------
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/user')
            .reply(() => [200, cloneDeep(this._user)]);

        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/user')
            .reply(({request}) =>
            {
                // Get the user mock-api
                const user = cloneDeep(request.body.user);

                // Update the user mock-api
                this._user = assign({}, this._user, user);

                // Return the response
                return [200, cloneDeep(this._user)];
            });
    


    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/boards', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the boards
        let boards: any[] | null = cloneDeep(this._boards);
    
        // Sort the boards
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            boards.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            boards.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the boards
            boards = boards.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = boards.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedBoards = boards.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedBoards,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });



    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/cards', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the cards
        let cards: any[] | null = cloneDeep(this._cards);
    
        // Sort the cards
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            cards.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            cards.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the cards
            cards = cards.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = cards.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCards = cards.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCards,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/card_comments', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the card_comments
        let card_comments: any[] | null = cloneDeep(this._card_comments);
    
        // Sort the card_comments
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            card_comments.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            card_comments.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the card_comments
            card_comments = card_comments.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = card_comments.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = card_comments.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
 
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/card_logs', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the card_logs
        let card_logs: any[] | null = cloneDeep(this._card_logs);
    
        // Sort the card_logs
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            card_logs.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            card_logs.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the card_logs
            card_logs = card_logs.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = card_logs.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_logs = card_logs.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_logs,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/categories', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the categories
        let categories: any[] | null = cloneDeep(this._categories);
    
        // Sort the categories
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            categories.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            categories.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the categories
            categories = categories.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = categories.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = categories.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/companies', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the companies
        let companies: any[] | null = cloneDeep(this._companies);
    
        // Sort the companies
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            companies.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            companies.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the companies
            companies = companies.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = companies.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = companies.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/issues', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the issues
        let issues: any[] | null = cloneDeep(this._issues);
    
        // Sort the issues
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            issues.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            issues.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the issues
            issues = issues.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = issues.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = issues.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/lists', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the lists
        let lists: any[] | null = cloneDeep(this._lists);
    
        // Sort the lists
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            lists.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            lists.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the lists
            lists = lists.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = lists.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = lists.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/notifications', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the notifications
        let notifications: any[] | null = cloneDeep(this._notifications);
    
        // Sort the notifications
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            notifications.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            notifications.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the notifications
            notifications = notifications.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = notifications.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = notifications.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/permissions', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the permissions
        let permissions: any[] | null = cloneDeep(this._permissions);
    
        // Sort the permissions
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            permissions.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            permissions.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the permissions
            permissions = permissions.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = permissions.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = permissions.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/tasks', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the tasks
        let tasks: any[] | null = cloneDeep(this._tasks);
    
        // Sort the tasks
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            tasks.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            tasks.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the tasks
            tasks = tasks.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = tasks.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = tasks.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    this._fuseMockApiService
    .onGet('api/apps/ecommerce/inventory/task_logs', 300)
    .reply(({ request }) => {
        // Get available queries
        const search = request.params.get('search');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const page = parseInt(request.params.get('page') ?? '1', 10);
        const size = parseInt(request.params.get('size') ?? '10', 10);
    
        // Clone the task_logs
        let task_logs: any[] | null = cloneDeep(this._task_logs);
    
        // Sort the task_logs
        if (sort === 'id' || sort === 'name' || sort === 'active') {
            task_logs.sort((a, b) => {
                const fieldA = (a[sort] || '').toString().toUpperCase();
                const fieldB = (b[sort] || '').toString().toUpperCase();
                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        } else {
            task_logs.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
        }
    
        // If search exists...
        if (search) {
            // Filter the task_logs
            task_logs = task_logs.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
    
        // Paginate
        const totalCount = task_logs.length;
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
        const paginatedCard_comments = task_logs.slice(startIndex, endIndex + 1);
    
        // Construct pagination object
        const pagination = {
            items: paginatedCard_comments,
            page,
            limit: size,
            totalCount,
        };
    
        // Return the response
        return [
            200,
            {
                pagination,
            },
        ];
    });
    

}

}


