import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createMessages1618767539305 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'messages',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'message',
                    type: 'varchar',
                    isNullable: false,
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
        await queryRunner.dropTable('messages');
    }

}
