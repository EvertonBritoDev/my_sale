import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  CreateUsers1753121010136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.createTable(
        new Table({
          name: 'users',
          columns:[
            {
              name:'id',
              type:'integer',
              isPrimary:true,
              isGenerated:true,
              generationStrategy:"increment",

            },
            {
              name:'name',
              type:'varchar',
            },
            {
              name:'email',
              type:'varchar',
              isUnique: true
            },
            {
              name:'password',
              type:'varchar',
            },
            {
              name:'avatar',
              type:'varchar',
              isNullable:true
            },
            {
              name:'create_at',
              type:'timestamp',
              default:'now()',
            },
            {
              name:'updated_at',
              type:'timestamp',
              default:'now()',
            }
          ]
        })
      )
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
