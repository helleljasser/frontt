import { Injectable } from '@angular/core';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { brands as brandsData, categories as categoriesData, projects as projectsData, tags as tagsData, vendors as vendorsData, } from 'app/mock-api/apps/test/inventory/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class ECommerceInventoryMockApi
{
    private _categories: any[] = categoriesData;
    private _brands: any[] = brandsData;
    private _projects: any[] = projectsData;
    private _tags: any[] = tagsData;
    private _vendors: any[] = vendorsData;
 

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
        this._fuseMockApiService
            .onGet('api/apps/test/inventory/categories')
            .reply(() => [200, cloneDeep(this._categories)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Brands - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/test/inventory/brands')
            .reply(() => [200, cloneDeep(this._brands)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Projects - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/test/inventory/projects', 300)
            .reply(({request}) =>
            {
                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the projects
                let projects: any[] | null = cloneDeep(this._projects);

                // Sort the projects
                if ( sort === 'id' || sort === 'name' || sort === 'active' )
                {
                    projects.sort((a, b) => {
                       
                        const fieldA = (a[sort] || "").toString().toUpperCase();
                        const fieldB = (b[sort] || "").toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                    
                 
                }
                else
                {
                    projects.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if ( search )
                {
                    // Filter the projects
                    projects = projects.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const projectsLength = projects.length;

                // Calculate pagination details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), projectsLength);
                const lastPage = Math.max(Math.ceil(projectsLength / size), 1);

                // Prepare the pagination object
                let pagination = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // projects but also send the last possible page so
                // the app can navigate to there
                if ( page > lastPage )
                {
                    projects = null;
                    pagination = {
                        lastPage,
                    };
                }
                else
                {
                    // Paginate the results by size
                    projects = projects.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        length    : projectsLength,
                        size      : size,
                        page      : page,
                        lastPage  : lastPage,
                        startIndex: begin,
                        endIndex  : end - 1,
                    };
                }

                // Return the response
                return [
                    200,
                    {
                        projects,
                        pagination,
                    },
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Project - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/test/inventory/project')
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
            .onPost('api/apps/test/inventory/project')
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
                    vendor     : '',
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
            .onPatch('api/apps/test/inventory/project')
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
            .onDelete('api/apps/test/inventory/project')
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

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/test/inventory/tags')
            .reply(() => [200, cloneDeep(this._tags)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/test/inventory/tag')
            .reply(({request}) =>
            {
                // Get the tag
                const newTag = cloneDeep(request.body.tag);

                // Generate a new GUID
                newTag.id = FuseMockApiUtils.guid();

                // Unshift the new tag
                this._tags.unshift(newTag);

                // Return the response
                return [200, newTag];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/test/inventory/tag')
            .reply(({request}) =>
            {
                // Get the id and tag
                const id = request.body.id;
                const tag = cloneDeep(request.body.tag);

                // Prepare the updated tag
                let updatedTag = null;

                // Find the tag and update it
                this._tags.forEach((item, index, tags) =>
                {
                    if ( item.id === id )
                    {
                        // Update the tag
                        tags[index] = assign({}, tags[index], tag);

                        // Store the updated tag
                        updatedTag = tags[index];
                    }
                });

                // Return the response
                return [200, updatedTag];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tag - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/test/inventory/tag')
            .reply(({request}) =>
            {
                // Get the id
                const id = request.params.get('id');

                // Find the tag and delete it
                this._tags.forEach((item, index) =>
                {
                    if ( item.id === id )
                    {
                        this._tags.splice(index, 1);
                    }
                });

                // Get the projects that have the tag
                const projectsWithTag = this._projects.filter(project => project.tags.indexOf(id) > -1);

                // Iterate through them and delete the tag
                projectsWithTag.forEach((project) =>
                {
                    project.tags.splice(project.tags.indexOf(id), 1);
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Vendors - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/test/inventory/vendors')
            .reply(() => [200, cloneDeep(this._vendors)]);
    }
}
