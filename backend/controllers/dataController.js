import fs from 'fs';

const loadData = () => {
    const rawData = fs.readFileSync('./data/aviatize_students.json');
    return JSON.parse(rawData);
};

export const findRelevantData = (query) => {
    const data = loadData();
    return data.students.filter(student => 
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.enrollment.toLowerCase().includes(query.toLowerCase())
    );
};
