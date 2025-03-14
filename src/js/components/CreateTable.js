
const TABLE_CONFIG = {
    IS_DARK: 'isDark',
    STRIPED: 'striped',
    BORDERED: 'bordered',
    COMPACT: 'compact',
    ROUNDED: 'rounded',
    THEME: 'theme',
    HOVER: 'hover'
};

const THEMES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
    DEFAULT: 'default'
};

export default class CreateTable {
    constructor(header, config = {}) {
        if (!Array.isArray(header)) {
            throw new Error("Header must be an array");
        }

        this.config = config;
        this.table = document.createElement("table");
        this.table.className = 'table';
        this.header = header;
        this.rows = [header];
        this.tbody = document.createElement("tbody");

        this.initializeTable();
        this.applyConfig();
    }

    initializeTable() {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");

        this.header.forEach(col => {
            const th = document.createElement("th");
            th.innerHTML = col;
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        this.table.append(thead, this.tbody);
    }

    applyConfig() {
        const { isDark, striped, bordered, compact, rounded, theme = THEMES.DEFAULT, hover } = this.config;

        if (isDark) this.table.classList.add('dark');
        if (striped) this.table.classList.add('striped');
        if (bordered) this.table.classList.add('bordered');
        if (compact) this.table.classList.add('compact');
        if (rounded) this.table.classList.add('rounded');
        if (hover) this.table.classList.add('hover');

        this.table.classList.add(theme);
    }

    render() {
        return this.table;
    }

    addRow(...cols) {
        if (!Array.isArray(cols)) {
            throw new Error("Columns must be an array");
        }

        this.rows.push(cols);
        const tr = document.createElement('tr');

        cols.forEach(col => {
            const td = document.createElement('td');
            td.innerHTML = col;
            tr.appendChild(td);
        });

        this.tbody.appendChild(tr);
    }

    removeRow(index) {
        if (index < 0 || index >= this.rows.length - 1) {
            throw new Error("Invalid row index");
        }

        this.rows.splice(index + 1, 1);
        this.tbody.removeChild(this.tbody.children[index]);
    }

    getRow(index) {
        if (index < 0 || index >= this.rows.length - 1) {
            throw new Error("Invalid row index");
        }

        return this.rows[index + 1];
    }

    getCol(rowIndex, colIndex) {
        if (rowIndex < 0 || rowIndex >= this.rows.length - 1 || colIndex < 0 || colIndex >= this.header.length) {
            throw new Error("Invalid row or column index");
        }

        return this.rows[rowIndex + 1][colIndex];
    }

    setCol(rowIndex, colIndex, newVal) {
        if (rowIndex < 0 || rowIndex >= this.rows.length - 1 || colIndex < 0 || colIndex >= this.header.length) {
            throw new Error("Invalid row or column index");
        }

        const row = this.tbody.children[rowIndex];
        const col = row.children[colIndex];
        col.innerHTML = newVal;
        this.rows[rowIndex + 1][colIndex] = newVal;
    }

    insertData(rows) {
        if (!Array.isArray(rows)) {
            throw new Error("Rows must be an array");
        }

        rows.forEach(row => this.addRow(...row));
    }

    clearTable() {
        this.tbody.innerHTML = '';
        this.rows = [this.header];
    }
    getRowLen(){
        return this.rows.length - 1
    }
}