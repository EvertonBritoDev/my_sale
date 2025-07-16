import { table } from "console";
import { MigrationInterface, QueryRunner, Table, Tree } from "typeorm";

export class  CreateProducts1752678820976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:'products',
          columns:[{
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
            name:'price',
            type:'decimal',
            precision:10,
            scale:2,
          },
          {
            name:'quantity',
            type:'int',
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
      queryRunner.dropTable('products');
    }

}
