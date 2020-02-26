import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-select2',
    templateUrl: './select2.component.html',
    styleUrls: ['./select2.component.scss']
})
export class Select2Component implements OnInit, OnChanges {

    @Input() set data(value: any[]) {
        if (value.length !== this.parameterizedData.length && value[0] !== this.parameterizedData[0]) {
            this.setOptions(value);
        }
    }

    @Input() parameter: string;
    @Input() set initVal(value) {
        this.initializationData = value;
        this.setValues();
    }
    @Input() config: {};

    @Input() set enabled(value) {
        this._enabled = value;
    }

    multiple;
    @Output() onChange = new EventEmitter<any>();

    @ViewChild('selectInput', { static: false }) selectInput: ElementRef;

    parameterizedData = [];
    initializationData = [];
    _enabled: boolean = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.initSelect();
        this.initEvents();
    }

    ngOnChanges(changes) {
        if (changes['initVal']) {
            try {
                if (changes['initVal'].previousValue.length !== changes['initVal'].currentValue.length) {
                    this.setValues();
                }
            } catch (e) {
                this.setValues();
            }
        }
    }

    setOptions(value) {
        this.parameterizedData = [];
        try {
            if (value[0].id && value[0].text) {
                this.parameterizedData = value;
            } else {
                throw { error: 'invalid data' };
            }
        } catch (e) {
            for (const item of value) {
                this.parameterizedData.push({
                    id: item[this.parameter || 'name'],
                    text: item[this.parameter || 'name'],
                });
            }
        }
        $(this.selectInput.nativeElement).empty();
        $(this.selectInput.nativeElement).select2({
            data: this.parameterizedData,
            ...this.config,
            width: '100%'
        });

        this.setValues();
    }

    initSelect() {
        if (this.config && this.config['multiple']) {
            this.multiple = this.config['multiple'] ? true : false;
        }

        $(this.selectInput.nativeElement).select2({
            data: this.parameterizedData,
            ...this.config
        }).enable(this._enabled);


        this.setValues();
    }

    setValues() {
        if (this.initializationData && this.parameterizedData.length > 1) {
            const intersections = [];
            for (const initItem of this.initializationData) {
                for (const data of this.parameterizedData) {
                    if (initItem === data.id) {
                        intersections.push(initItem);
                    }
                }
            }

            this.cdr.detectChanges();
            $(this.selectInput.nativeElement).val(intersections).trigger('change');
        }
    }

    initEvents() {
        $(this.selectInput.nativeElement).on('change', (evt) => {
            this.onChange.emit($(this.selectInput.nativeElement).select2('data'));
        });
    }
}
