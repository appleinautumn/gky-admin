import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'lives',
  timestamps: true, // to handle `created_at` and `updated_at`
})
export class Lives extends Model<Lives> {
  @Column(DataType.STRING)
  ku1live: string;

  @Column(DataType.STRING)
  ku2live: string;

  @Column(DataType.STRING)
  ku5live: string;

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
