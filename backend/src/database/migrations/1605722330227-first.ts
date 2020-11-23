import {MigrationInterface, QueryRunner} from "typeorm";

export class first1605722330227 implements MigrationInterface {
    name = 'first1605722330227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `name` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `email` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `name` varchar(255) NULL DEFAULT 'NULL'");
    }

}
