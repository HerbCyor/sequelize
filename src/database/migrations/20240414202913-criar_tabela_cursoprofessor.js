'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.createTable('curso_professor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      professorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'professores',
            schema: 'public'
          },
          key: 'id'
        }
      },
      cursoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cursos',
            schema: 'public'
          },
          key: 'id'

        }
      }

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('curso_professor');

  }
};
