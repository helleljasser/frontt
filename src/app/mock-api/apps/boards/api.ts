import { Injectable } from '@angular/core';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class ECommerceInventoryMockApi {
    private _boards: any[] = []; // Remplacez par vos données d'utilisateurs
    private _board: any = {}; // Remplacez par vos données d'utilisateur

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        // GET Boards
        this._fuseMockApiService
            .onGet('api/apps/boards/boards', 300)
            .reply(({ request }) => {
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                let boards: any[] | null = cloneDeep(this._boards);

                if (sort === 'id' || sort === 'name' || sort === 'active') {
                    boards.sort((a, b) => {
                        const fieldA = (a[sort] || '').toString().toUpperCase();
                        const fieldB = (b[sort] || '').toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                } else {
                    boards.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
                }

                if (search) {
                    boards = boards.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                const totalCount = boards.length;
                const startIndex = (page - 1) * size;
                const endIndex = Math.min(startIndex + size - 1, totalCount - 1);
                const paginatedBoards = boards.slice(startIndex, endIndex + 1);

                const pagination = {
                    items: paginatedBoards,
                    page,
                    limit: size,
                    totalCount,
                };

                return [200, { pagination }];
            });

        // GET Board
        this._fuseMockApiService
            .onGet('api/apps/boards/board')
            .reply(({ request }) => {
                const id = request.params.get('id');
                const board = cloneDeep(this._boards.find(item => item.id === id));
                return [200, board];
            });

        // POST Board
        this._fuseMockApiService
            .onPost('api/apps/boards/boards')
            .reply(() => {
                const newBoard = {
                    id: FuseMockApiUtils.guid(),
                    category: '',
                    name: 'A New Board',
                    description: '',
                    tags: [],
                    sku: '',
                    barcode: '',
                    brand: '',
                    vendor: '',
                    stock: '',
                    reserved: '',
                    cost: '',
                    basePrice: '',
                    taxPercent: '',
                    price: '',
                    weight: '',
                    thumbnail: '',
                    images: [],
                    active: false,
                };
                this._boards.unshift(newBoard);
                return [200, newBoard];
            });

        // PATCH Board
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/boards')
            .reply(({ request }) => {
                const id = request.body.id;
                const board = cloneDeep(request.body.board);
                let updatedBoard = null;
                this._boards.forEach((item, index, boards) => {
                    if (item.id === id) {
                        boards[index] = assign({}, boards[index], board);
                        updatedBoard = boards[index];
                    }
                });
                return [200, updatedBoard];
            });
    }
}
