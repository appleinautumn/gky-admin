import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'lives',
  timestamps: true, // to handle `created_at` and `updated_at`
})
export class Lives extends Model<Lives> {
  @Column
  ku1live: string;

  @Column
  ku2live: string;

  @Column
  ku5live: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
