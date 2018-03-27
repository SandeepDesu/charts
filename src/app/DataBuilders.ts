export interface IbaseBuilder {
  getData(): any;
  getName(): string;
}

export class BaseBuilder<T> implements IbaseBuilder {
  public data: T;
  protected name: string;

  getData(): T {
    return this.data;
  }

  getName(): string {
    return this.name;
  }
  constructor(name: string) {
    this.name = name;
  }
}


export class MultiPeriodChart extends BaseBuilder<any> {

    constructor(sourceData, name) {
        super(name);
        this.data = sourceData.data[0].values;
    }

    getData() {
      return this.data;
    }

}

export class ChartBuilder extends BaseBuilder<Array<{label:string, value:number}> > {
    YLabel = '';
    XLabel = '';
    Barcolor = '#98abc5';
    constructor(Xlabel: string, Ylabel: string, barcolor: string, name: string) {
        super(name);
        this.XLabel = Xlabel;
        this.YLabel = Ylabel;
        if (barcolor) {
            this.Barcolor = barcolor;
        }
    }

    getCount(): number {
        return this.data.length;
    }

    setfromValuesArray(valsarray: Array<{name:string, value:number}>) {
        this.data = [];
        for (const indx of Object.keys(valsarray)) {
          this.data.push({'label': valsarray[indx].name, 'value': valsarray[indx].value } );
        }
    }

}

export class TableBuilder extends BaseBuilder< Array<{ name:string, count:number, value:number }> > {
  protected HeaderArray: string[];
  protected name: string;

  constructor(data, headerArr, name) {
    super(name);
    this.data = data;
    this.HeaderArray = headerArr;
    if (Array.isArray(this.data)) {
      // lets assume its our standard values array
      // so change the getRows function accordingly
      // maybe we shoudl make a type enum that can switch these more formally
      this.getRows = this.getRowsfromValuesArray;
    }

  }
  getHeader(): string[] {
    return this.HeaderArray;
  }
  getRows(): any[] {
    //override this in the calling class to express different functionality
    return this.getRowsfromDict();
  }
  getRowsfromDict(): any[] {
    // two column row with key and value
    const rows = [];
    for (const key in this.data) {
      rows.push([key, this.data[key] ]);
    }
    return rows;
  }

  getRowsfromValuesArray(): any[] {
    // standardized values array of name, value, count
    const rows = [];
    for (const indx in this.data) {
      const valobj = this.data[indx];
      rows.push([valobj.name, valobj.count.toLocaleString(), valobj.value.toLocaleString()]);
    }
    return rows;
  }


}
