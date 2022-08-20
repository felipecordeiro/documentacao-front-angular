export class Resources {
    static obter = "obter";
    static editar = "editar";
    static salvar = "salvar";
    static excluir = "excluir";

    url;

    constructor(endpoint: any) {
        this.endpoint(endpoint);
    }

    endpoint(endpoint: any): Resources {
        this.url = endpoint;
        return this;
    }

    resource(resource: any): Resources {
        this.url = this.url.concat("/").concat(resource);
        return this;
    }

    queryParams(queryParams: any): Resources {
        this.url = this.url.concat(queryParams);
        return this;
    }

    build() {
        return this.url;
    }
}