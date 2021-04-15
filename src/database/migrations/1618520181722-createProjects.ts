import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createProjects1618520181722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'projects',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'area',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'tags',
                    type: 'varchar',
                    isArray: true,
                    default: []
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects');
    }

}
