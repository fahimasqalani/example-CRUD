import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '@services/services.service';

@Component({
    selector: "app-typeahead",
    templateUrl: "./typeahead.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./typeahead.component.scss']
})

export class TypeaheadComponent implements OnInit {

    language = localStorage.getItem('language') || 'en';
    @Input() list = [];
    
    @Input() id = 'picker';
    @Input() type = 'get';
    @Input() displayParam: any = '';

    @Input() url = '';
    @Input() placeholder = 'Search item';

    @Output() outputData: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.initPicker();
    }
    
    initPicker() {
        let that = this;

        ($(`#${this.id}`) as any).select2({
            placeholder: this._services.translate.instant(this.placeholder),
            templateResult: function(d) {
                if (d[that.displayParam.key]) {
                    return `<span>
                        ${ that.language === 'en' ? d[that.displayParam.name] : 
                        (d[that.displayParam.name2] ? d[that.displayParam.name2] : d[that.displayParam.name]) }
                        ${d[that.displayParam.second] ? ` - ${d[that.displayParam.second]}` : ''}
                    </span>`
                }
            },
            language: {
                noResults: function() {
                  return that._services.translate.instant('No Result Found');
                },
            },
            templateSelection: function(d) {
                let x;
                if (d[that.displayParam.name]) {
                    if (that.language === 'en') {
                        x = d[that.displayParam.name];
                    } else {
                        d[that.displayParam.name2] ? x = d[that.displayParam.name2] : x = d[that.displayParam.name];
                    }
                } else if (d['text']) {
                    x = d.text;
                }
                return x;
            },
            escapeMarkup: function(m) {
                return m;
            },
            ajax: {
                type: this.type.toUpperCase(),
                headers: {
                    Authorization: this._services.getToken()
                },
                url: this.url,
                data: function(d,) {
                    let obj = { value: d.term };
                    return obj;
                },
                processResults: function(response) {
                    return { results: response.data };
                },
            }
        }).on('select2:select', function(e) {
            that.list.push(e.params.data);
            that.focusPicker();
        }).on("select2:unselecting", function(e) {
            that.removeProduct(e.params.args.data);
            that.focusPicker();
        })
    }

    focusPicker() {
        let dom: any = document.getElementsByClassName('select2-search__field');
        if (dom && dom.length) {
            setTimeout(() => {
                dom[0].focus();
            }, 10)
        }
        this.outputData.emit(this.list);
    }

    removeProduct(data) {
        for (let x = 0; x < this.list.length; x++) {
            if ((data.id == this.list[x][this.displayParam.key]) || data.text === this.list[x][this.displayParam.name] 
                || data.name === this.list[x][this.displayParam.name]) {
                this.list.splice(x, 1);
                break;
            }
        }
    }

}