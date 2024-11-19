import React from 'react';
import NotasAdicionales from './NotasAdicionales';
import Button from './Button';

const Table = ({ title, rows, notas }) => {

    // console.log(rows);

    return (

        <div className="border-bottom border-black pb-3  mb-5">

            <h2 className="text-center mb-5">{title}</h2>
            <table className="table table-light table-hover w-100 mb-4">
                <thead>
                    <tr>
                        <th className="align-middle text-center" style={{ width: '10%' }}>Método</th>
                        <th className="align-middle" style={{ width: '45%' }}>Función</th>
                        <th className="align-middle" style={{ width: '35%' }}>URL</th>
                        <th className="align-middle" style={{ width: '15%' }}>Boton</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className={`align-middle text-center fw-bold text-${row.methodColor}`}>
                                {row.method}
                            </td>
                            <td className="align-middle">{row.function}</td>
                            <td className="align-middle fw-bold">{row.url}</td>

                            <td className="align-middle">
                                {/* {console.log(row.button)} */}
                                {/* Verificamos que row.button esté definido antes de intentar acceder a sus propiedades */}
                                {row.button ? (
                                    <Button text={row.button.text} color={row.button.color} fn={row.button.fn} />
                                ) : (
                                    <span>No button</span>  // Si no hay botón, mostramos un texto alternativo
                                )}

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <NotasAdicionales notas={notas} />

        </div>


    );
};

export default Table;
