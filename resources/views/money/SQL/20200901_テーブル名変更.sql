/* mst_category　にテーブル名変更 */
alter table category_dai rename to mst_category;
/* price　の型変更 */
alter table money modify price integer;
/* tbl_money　にテーブル名変更 */
alter table money rename to tbl_money;





